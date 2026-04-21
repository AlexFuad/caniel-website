import React from 'react';
import { motion } from 'framer-motion';
import { 
  Send,
  MessageCircle,
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const ContactForm = ({ formData, handleInputChange, handleSubmit }) => {
  const { translate } = useLanguage();
  
  const services = [
    translate('contact.service.web_dev'),
    translate('contact.service.digital_marketing'),
    translate('contact.service.business_consulting'),
    translate('contact.service.management_system'),
    translate('contact.service.ecommerce'),
    translate('contact.service.mobile_app'),
    translate('contact.service.seo'),
    translate('contact.form.other')
  ];

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-form rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {translate('contact.form.title')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {translate('contact.form.name')} {translate('contact.form.required')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={translate('contact.form.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {translate('contact.form.email')} {translate('contact.form.required')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {translate('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={translate('contact.form.phone_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {translate('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={translate('contact.form.company_placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {translate('contact.form.service')}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{translate('contact.form.select_service')}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {translate('contact.form.message')} {translate('contact.form.required')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={translate('contact.form.message_placeholder')}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {translate('contact.form.submit')}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{translate('contact.info.office')}</h3>
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                <img  
                  alt="Peta lokasi kantor Caniel Agency di Kota Tangerang"
                  className="w-full h-full object-cover rounded-lg"
                  src="https://images.unsplash.com/photo-1606498679340-0aec3185edbd" 
                />
              </div>
              <div className="mt-4 text-gray-300">
                <p className="font-medium">Caniel Agency</p>
                <p>The Family Residence, Jl. Pratama, Kav-101 Deplu Kreo, Cipadu Jaya, Larangan,</p>
                <p>Kota Tangerang, 15155</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{translate('contact.info.quick_actions')}</h3>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 justify-start"
                  onClick={handleSubmit}
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  {translate('contact.info.whatsapp')}
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white justify-start"
                  onClick={handleSubmit}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  {translate('contact.info.schedule')}
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white justify-start"
                  onClick={handleSubmit}
                >
                  <Users className="mr-3 h-5 w-5" />
                  {translate('contact.info.consultation')}
                </Button>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{translate('contact.info.response_time')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{translate('contact.info.email_response')}</span>
                  <span className="text-blue-400 font-medium">{translate('contact.info.email_time')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{translate('contact.info.whatsapp_response')}</span>
                  <span className="text-green-400 font-medium">{translate('contact.info.whatsapp_time')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{translate('contact.info.phone_response')}</span>
                  <span className="text-yellow-400 font-medium">{translate('contact.info.phone_time')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;