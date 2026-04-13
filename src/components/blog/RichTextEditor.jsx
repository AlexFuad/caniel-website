import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, Link2, Code, List, ListOrdered, Quote, 
  Image as ImageIcon, Video, Code2, ExternalLink, Table, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify, Strikethrough, Undo, Redo,
  Type, Minus, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ToolbarButton = ({ onClick, children, isActive, disabled = false, title }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    disabled={disabled}
    title={title}
    className={`h-8 w-8 ${isActive ? 'bg-slate-600 text-white' : 'text-gray-400'} hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {children}
  </Button>
);

const Divider = () => <div className="w-px h-5 bg-gray-700 mx-1" />;

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const { toast } = useToast();
  
  // Dialog states
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  
  // Dialog values
  const [linkUrl, setLinkUrl] = useState('https://');
  const [imageUrl, setImageUrl] = useState('https://');
  const [imageWidth, setImageWidth] = useState('100');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoWidth, setVideoWidth] = useState('560');
  const [videoHeight, setVideoHeight] = useState('315');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  
  // Editor state
  const [savedSelection, setSavedSelection] = useState(null);
  const [currentFormat, setCurrentFormat] = useState('p');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Initialize editor content
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && value !== editor.innerHTML) {
      editor.innerHTML = value;
      updateHistoryState();
    }
  }, [value]);

  // Update history state
  const updateHistoryState = useCallback(() => {
    setCanUndo(document.queryCommandState('undo'));
    setCanRedo(document.queryCommandState('redo'));
  }, []);

  // Selection management
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelection);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateHistoryState();
    }
  };

  // Command execution
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHtml = (html) => {
    restoreSelection();
    execCmd('insertHTML', html);
  };

  // Formatting commands
  const handleFormat = (format) => {
    setCurrentFormat(format);
    execCmd('formatBlock', `<${format}>`);
  };

  const handleAlignment = (alignment) => {
    const commands = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull'
    };
    execCmd(commands[alignment]);
  };

  const handleBlockquote = () => {
    execCmd('formatBlock', '<blockquote>');
  };

  const handleCodeSnippet = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      if (selectedText) {
        const codeNode = document.createElement('code');
        codeNode.textContent = selectedText;
        codeNode.className = 'inline-code bg-gray-800 px-1 py-0.5 rounded text-sm font-mono';
        range.deleteContents();
        range.insertNode(codeNode);
        selection.removeAllRanges();
        handleInput();
      }
    }
  };

  const handleCodeBlock = () => {
    const codeHtml = '<pre class="code-block bg-gray-800 p-4 rounded my-2 overflow-x-auto"><code class="text-sm font-mono">// Your code here\nconsole.log("Hello World");</code></pre><p></p>';
    insertHtml(codeHtml);
  };

  // Link handling
  const openLinkDialog = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed) {
      saveSelection();
      setIsLinkDialogOpen(true);
    } else {
      toast({
        title: "Pilih Teks Terlebih Dahulu",
        description: "Silakan pilih teks yang ingin Anda jadikan tautan.",
        variant: "destructive"
      });
    }
  };

  const handleAddLink = () => {
    setIsLinkDialogOpen(false);
    restoreSelection();
    if (linkUrl && (linkUrl.startsWith('http://') || linkUrl.startsWith('https://'))) {
      execCmd('createLink', linkUrl);
    } else {
      toast({
        title: "URL tidak valid",
        description: "Harap masukkan URL yang valid diawali dengan http:// atau https://.",
        variant: "destructive"
      });
    }
    setLinkUrl('https://');
  };

  // Image handling with resize
  const handleAddImage = () => {
    setIsImageDialogOpen(false);
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="Image" style="width: ${imageWidth}%; max-width: 100%; height: auto; display: block; margin: 0.5em 0;" class="resizable-image" data-resizable="true" data-width="${imageWidth}" />`;
      insertHtml(imgHtml);
    }
    setImageUrl('https://');
    setImageWidth('100');
  };

  // Video handling with resize
  const handleAddVideo = () => {
    setIsVideoDialogOpen(false);
    if (videoUrl) {
      let embedUrl = videoUrl;
      if (videoUrl.includes('youtube.com/watch?v=')) {
        embedUrl = videoUrl.replace('watch?v=', 'embed/');
      } else if (videoUrl.includes('youtu.be/')) {
        embedUrl = videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
      } else if (videoUrl.includes('vimeo.com/')) {
        embedUrl = videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/');
      }
      
      const videoHtml = `
        <div class="video-container resizable-video" 
             contenteditable="false" 
             style="position: relative; width: 100%; max-width: ${videoWidth}px; margin: 1em 0; resize: both; overflow: hidden; border: 2px dashed #555; border-radius: 4px;"
             data-resizable="true"
             data-max-width="${videoWidth}">
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe src="${embedUrl}" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                    frameborder="0" 
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
          </div>
          <div class="resize-hint" 
               style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; pointer-events: none;">
            ↘ Drag to resize
          </div>
        </div>
        <p></p>`;
      insertHtml(videoHtml);
    }
    setVideoUrl('');
    setVideoWidth('560');
    setVideoHeight('315');
  };

  // Table handling
  const handleAddTable = () => {
    setIsTableDialogOpen(false);
    let tableHtml = `
      <table style="width:100%; border-collapse: collapse; border: 1px solid #555; margin: 1em 0;">
        <thead>
          <tr style="background: #333;">
            ${Array.from({ length: tableCols }, (_, i) => 
              `<th style="border: 1px solid #555; padding: 10px; text-align: left; font-weight: bold;">Header ${i + 1}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: tableRows }, (_, i) => 
            `<tr>
              ${Array.from({ length: tableCols }, (_, j) => 
                `<td style="border: 1px solid #555; padding: 8px;">Cell ${i + 1}-${j + 1}</td>`
              ).join('')}
            </tr>`
          ).join('')}
        </tbody>
      </table>
      <p></p>`;
    insertHtml(tableHtml);
  };

  // Horizontal rule
  const insertHorizontalRule = () => {
    execCmd('insertHorizontalRule');
  };

  // Clear formatting
  const clearFormatting = () => {
    execCmd('removeFormat');
    execCmd('formatBlock', 'p');
    setCurrentFormat('p');
  };

  const handleAction = (feature) => {
    toast({
      title: `🚧 Fitur ${feature} sedang dikembangkan!`,
      description: "Anda dapat meminta fitur ini di prompt berikutnya. 🚀"
    });
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1A1A1A] focus-within:ring-2 focus-within:ring-blue-500">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-700 p-2">
        {/* Format dropdown */}
        <select 
          onChange={(e) => handleFormat(e.target.value)} 
          value={currentFormat}
          className="bg-[#222] border border-gray-600 rounded-md px-2 py-1 text-sm h-8 mr-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        <Divider />

        {/* Text formatting */}
        <ToolbarButton onClick={() => execCmd('bold')} title="Bold (Ctrl+B)"><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('italic')} title="Italic (Ctrl+I)"><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('underline')} title="Underline (Ctrl+U)"><Underline className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('strikeThrough')} title="Strikethrough"><Strikethrough className="h-4 w-4" /></ToolbarButton>
        
        <Divider />

        {/* Text alignment */}
        <ToolbarButton onClick={() => handleAlignment('left')} title="Align Left"><AlignLeft className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAlignment('center')} title="Align Center"><AlignCenter className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAlignment('right')} title="Align Right"><AlignRight className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAlignment('justify')} title="Justify"><AlignJustify className="h-4 w-4" /></ToolbarButton>
        
        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => execCmd('insertUnorderedList')} title="Bullet List"><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('insertOrderedList')} title="Numbered List"><ListOrdered className="h-4 w-4" /></ToolbarButton>
        
        <Divider />

        {/* Insert */}
        <ToolbarButton onClick={openLinkDialog} title="Insert Link"><Link2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => { saveSelection(); setIsImageDialogOpen(true); }} title="Insert Image"><ImageIcon className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => { saveSelection(); setIsVideoDialogOpen(true); }} title="Insert Video (YouTube/Vimeo)"><Video className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => { saveSelection(); setIsTableDialogOpen(true); }} title="Insert Table"><Table className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={insertHorizontalRule} title="Insert Horizontal Line"><Minus className="h-4 w-4" /></ToolbarButton>
        
        <Divider />

        {/* Code */}
        <ToolbarButton onClick={handleCodeSnippet} title="Inline Code"><Code className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={handleCodeBlock} title="Code Block"><Code2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAction('Embed')} title="Embed HTML"><ExternalLink className="h-4 w-4" /></ToolbarButton>
        
        <Divider />

        {/* Utilities */}
        <ToolbarButton onClick={clearFormatting} title="Clear Formatting"><Type className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('undo')} disabled={!canUndo} title="Undo (Ctrl+Z)"><Undo className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('redo')} disabled={!canRedo} title="Redo (Ctrl+Y)"><Redo className="h-4 w-4" /></ToolbarButton>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onClick={() => updateHistoryState()}
        onKeyUp={() => updateHistoryState()}
        className="prose prose-invert max-w-none p-4 min-h-[400px] text-gray-300 focus:outline-none editor-content"
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6'
        }}
      />

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Masukkan URL Tautan</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="link-url" className="text-sm mb-2 block">URL</Label>
            <Input 
              id="link-url" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              className="bg-slate-800 border-slate-600"
              placeholder="https://example.com"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddLink}>Tambah Tautan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog with Resize */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Masukkan URL Gambar</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="image-url" className="text-sm mb-2 block">URL Gambar</Label>
              <Input 
                id="image-url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="bg-slate-800 border-slate-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-width" className="text-sm mb-2 block">Lebar (%)</Label>
              <Input 
                id="image-width" 
                type="number"
                min="10"
                max="100"
                value={imageWidth} 
                onChange={(e) => setImageWidth(e.target.value)} 
                className="bg-slate-800 border-slate-600"
              />
              <p className="text-xs text-gray-500 mt-1">Gambar akan responsif dan dapat di-resize</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddImage}>Tambah Gambar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog with Resize */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Masukkan URL Video</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="video-url" className="text-sm mb-2 block">URL Video (YouTube/Vimeo)</Label>
              <Input 
                id="video-url" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                className="bg-slate-800 border-slate-600"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <Label htmlFor="video-width" className="text-sm mb-2 block">Lebar Maksimum (px)</Label>
              <Input 
                id="video-width" 
                type="number"
                min="320"
                max="1200"
                value={videoWidth} 
                onChange={(e) => setVideoWidth(e.target.value)} 
                className="bg-slate-800 border-slate-600"
              />
              <p className="text-xs text-gray-500 mt-1">Video dapat di-resize setelah ditambahkan</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddVideo}>Tambah Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table Dialog */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Buat Tabel</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="table-rows" className="text-sm mb-2 block">Baris</Label>
                <Input 
                  id="table-rows" 
                  type="number" 
                  min="1"
                  max="20"
                  value={tableRows} 
                  onChange={(e) => setTableRows(parseInt(e.target.value, 10))} 
                  className="bg-slate-800 border-slate-600" 
                />
              </div>
              <div>
                <Label htmlFor="table-cols" className="text-sm mb-2 block">Kolom</Label>
                <Input 
                  id="table-cols" 
                  type="number" 
                  min="1"
                  max="10"
                  value={tableCols} 
                  onChange={(e) => setTableCols(parseInt(e.target.value, 10))} 
                  className="bg-slate-800 border-slate-600" 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTable}>Buat Tabel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
