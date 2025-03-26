class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <a href="/" class="logo">Pax Media</a>
          <nav>
            <ul>
              <li><a href="/work">Work</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('site-header', SiteHeader);