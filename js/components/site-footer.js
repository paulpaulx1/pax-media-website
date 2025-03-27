class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer>
            <div class="footer-container">
                <div class="footer-about">
                <a href="/" class="footer-logo">Pax Media</a>
                <p>
                    We craft digital experiences that elevate brands and drive results
                    for businesses of all sizes.
                </p>
                </div>
                <div class="footer-links-container">
                <h4 class="footer-heading">Navigation</h4>
                <ul class="footer-links">
                    <li><a href="/work">Work</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                </div>
                <div class="footer-links-container">
                <h4 class="footer-heading">Connect</h4>
                <ul class="footer-links">
                    <li><a href="mailto:hello@paxmedia.com">hello@pax.media</a></li>
                    <li><a href="tel:+15555555555">(555) 555-5555</a></li>
                </ul>
                </div>
            </div>
            <div class="copyright">© 2025 Pax Media. All rights reserved.</div>
        </footer> 
      `;
    }
  }
  
  customElements.define('site-footer', SiteFooter);