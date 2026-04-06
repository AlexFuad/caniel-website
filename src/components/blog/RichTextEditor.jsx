import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Underline, Link2, Code, List, ListOrdered, Quote, Image as ImageIcon, Video, Code2, ExternalLink, Table
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ToolbarButton = ({ onClick, children, isActive }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={`h-8 w-8 ${isActive ? 'bg-slate-600 text-white' : 'text-gray-400'} hover:bg-slate-700 hover:text-white`}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {children}
  </Button>
);

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const { toast } = useToast();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);

  const [linkUrl, setLinkUrl] = useState('https://');
  const [imageUrl, setImageUrl] = useState('https://');
  const [videoUrl, setVideoUrl] = useState('');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const [savedSelection, setSavedSelection] = useState(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && value !== editor.innerHTML) {
      editor.innerHTML = value;
    }
  }, [value]);
  
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
    }
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleInput();
  };

  const insertHtml = (html) => {
    restoreSelection();
    execCmd('insertHTML', html);
  };
  
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
  
  const handleFormat = (format) => {
    execCmd('formatBlock', `<${format}>`);
  };

  const handleBlockquote = () => {
    execCmd('formatBlock', '<blockquote>');
  };

  const handleCodeSnippet = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const codeNode = document.createElement('code');
      codeNode.textContent = selectedText;
      range.deleteContents();
      range.insertNode(codeNode);
      selection.removeAllRanges();
    }
  }

  const handleAddImage = () => {
    setIsImageDialogOpen(false);
    if(imageUrl) {
        insertHtml(`<img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;" />`);
    }
    setImageUrl('https://');
  };

  const handleAddVideo = () => {
    setIsVideoDialogOpen(false);
    if (videoUrl) {
      let embedUrl = videoUrl;
      if (videoUrl.includes('youtube.com/watch?v=')) {
        embedUrl = videoUrl.replace('watch?v=', 'embed/');
      } else if (videoUrl.includes('youtu.be/')) {
        embedUrl = videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
      }
      insertHtml(`<iframe src="${embedUrl}" width="560" height="315" frameborder="0" allowfullscreen style="max-width: 100%;"></iframe>`);
    }
    setVideoUrl('');
  };

  const handleAddTable = () => {
    setIsTableDialogOpen(false);
    let tableHtml = '<table style="width:100%; border-collapse: collapse; border: 1px solid #555;"><thead><tr>';
    for (let i = 0; i < tableCols; i++) {
        tableHtml += `<th style="border: 1px solid #555; padding: 8px;">Header ${i + 1}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let i = 0; i < tableRows; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < tableCols; j++) {
            tableHtml += `<td style="border: 1px solid #555; padding: 8px;">Cell ${i + 1}-${j + 1}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p></p>';
    insertHtml(tableHtml);
  };
  
  const handleAction = (feature) => {
    toast({
        title: `🚧 Fitur ${feature} sedang dikembangkan!`,
        description: "Anda dapat meminta fitur ini di prompt berikutnya. 🚀"
    });
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1A1A1A] focus-within:ring-2 focus-within:ring-blue-500">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-700 p-2">
        <select onChange={(e) => handleFormat(e.target.value)} className="bg-[#222] border border-gray-600 rounded-md p-1 text-sm h-8 mr-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
        </select>
        <ToolbarButton onClick={openLinkDialog}><Link2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('bold')}><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('italic')}><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('underline')}><Underline className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={handleBlockquote}><Quote className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={handleCodeSnippet}><Code className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('insertUnorderedList')}><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCmd('insertOrderedList')}><ListOrdered className="h-4 w-4" /></ToolbarButton>
        <div className="w-px h-5 bg-gray-700 mx-2"></div>
        <ToolbarButton onClick={() => { saveSelection(); setIsImageDialogOpen(true); }}><ImageIcon className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => { saveSelection(); setIsVideoDialogOpen(true); }}><Video className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => { saveSelection(); setIsTableDialogOpen(true); }}><Table className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAction('Code Block')}><Code2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => handleAction('Embed')}><ExternalLink className="h-4 w-4" /></ToolbarButton>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="prose prose-invert max-w-none p-4 min-h-[300px] text-gray-300 focus:outline-none"
        style={{ whiteSpace: 'pre-wrap' }}
      />

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Tautan</DialogTitle></DialogHeader>
          <Input id="link-url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="bg-slate-800 border-slate-600" />
          <DialogFooter><Button onClick={handleAddLink}>Tambah Tautan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Gambar</DialogTitle></DialogHeader>
          <Input id="image-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-slate-800 border-slate-600" />
          <DialogFooter><Button onClick={handleAddImage}>Tambah Gambar</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Video (YouTube)</DialogTitle></DialogHeader>
          <Input id="video-url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="bg-slate-800 border-slate-600" />
          <DialogFooter><Button onClick={handleAddVideo}>Tambah Video</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Buat Tabel</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="table-rows">Baris</Label>
              <Input id="table-rows" type="number" value={tableRows} onChange={(e) => setTableRows(parseInt(e.target.value, 10))} className="bg-slate-800 border-slate-600" />
            </div>
            <div>
              <Label htmlFor="table-cols">Kolom</Label>
              <Input id="table-cols" type="number" value={tableCols} onChange={(e) => setTableCols(parseInt(e.target.value, 10))} className="bg-slate-800 border-slate-600" />
            </div>
          </div>
          <DialogFooter><Button onClick={handleAddTable}>Buat Tabel</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;