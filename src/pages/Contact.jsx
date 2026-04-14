import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Navbar from "../components/home/Navigation";
import { Footer } from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-[#003366] text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Have questions about financial planning? We're here to help you on your journey to financial freedom.
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 -mt-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#FFB300]/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-[#FFB300]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">Our friendly team is here to help</p>
                <a href="mailto:contact@savingsyogi.com" className="text-[#003366] font-semibold hover:text-[#FFB300] transition-colors">
                  contact@savingsyogi.com
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#FFB300]/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-[#FFB300]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Mon-Fri from 9am to 6pm</p>
                <a href="tel:+911234567890" className="text-[#003366] font-semibold hover:text-[#FFB300] transition-colors">
                  +91 12345 67890
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#FFB300]/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-[#FFB300]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-2">Come say hello at our office</p>
                <p className="text-[#003366] font-semibold">
                  123 Finance Street, Mumbai, India
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#003366] mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 12345 67890"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your financial goals..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFB300] text-[#003366] py-4 rounded-xl font-bold text-lg hover:bg-[#FFC433] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                {/* Business Hours */}
                <div className="bg-[#003366] text-white p-8 rounded-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-[#FFB300]" />
                    <h3 className="text-2xl font-bold">Business Hours</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/80">Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Saturday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Sunday</span>
                      <span className="font-semibold text-[#FFB300]">Closed</span>
                    </div>
                  </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#003366] mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/savings" className="text-gray-600 hover:text-[#FFB300] transition-colors flex items-center gap-2">
                        → Smart Savings Tips
                      </a>
                    </li>
                    <li>
                      <a href="/financial-education" className="text-gray-600 hover:text-[#FFB300] transition-colors flex items-center gap-2">
                        → Financial Education
                      </a>
                    </li>
                    <li>
                      <a href="/Planning" className="text-gray-600 hover:text-[#FFB300] transition-colors flex items-center gap-2">
                        → Goal Planning
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="text-gray-600 hover:text-[#FFB300] transition-colors flex items-center gap-2">
                        → Blog & Resources
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social Media */}
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#003366] mb-4">Follow Us</h3>
                  <p className="text-gray-600 mb-6">Stay connected with us on social media for daily financial tips and updates.</p>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-[#003366] text-white rounded-xl flex items-center justify-center hover:bg-[#FFB300] hover:text-[#003366] transition-all">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="w-12 h-12 bg-[#003366] text-white rounded-xl flex items-center justify-center hover:bg-[#FFB300] hover:text-[#003366] transition-all">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="w-12 h-12 bg-[#003366] text-white rounded-xl flex items-center justify-center hover:bg-[#FFB300] hover:text-[#003366] transition-all">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="w-12 h-12 bg-[#003366] text-white rounded-xl flex items-center justify-center hover:bg-[#FFB300] hover:text-[#003366] transition-all">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#003366] mb-2">Find Us Here</h2>
              <p className="text-gray-600">Visit our office for personalized financial consultation</p>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-lg">
              <div className="w-full h-96 bg-gradient-to-br from-[#003366]/10 to-[#FFB300]/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#003366] mx-auto mb-4" />
                  <p className="text-xl font-bold text-[#003366]">123 Finance Street</p>
                  <p className="text-gray-600">Mumbai, Maharashtra, India 400001</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-r from-[#003366] to-[#002244] rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Let's work together to achieve your financial goals. Schedule a free consultation today.
              </p>
              <button className="bg-[#FFB300] text-[#003366] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFC433] transition-all transform hover:scale-105">
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

