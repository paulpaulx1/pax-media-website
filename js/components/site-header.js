class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<header class="sticky-header">
  <div class="header-content">
    <div class="logo">
      <a class="logo nav-link" style="text-decoration: none;" href="index.html">Pax Media</a>
    </div>

    <div id="menuToggle" class="mobile-menu">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>

      <ul id="menu">
        <li>
          <a href="index.html" class="nav-link">Home</a>
        </li>
        <li>
          <a href="index.html" class="nav-link">About</a>
        </li>
        <li>
          <a href="index.html" class="nav-link">Services</a>
        </li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    </div>

    <nav class="desktop-navigation">
      <a href="index.html" class="nav-link">Home</a>
      <a href="index.html" class="nav-link">About</a>
      <a href="index.html" class="nav-link">Services</a>
      <a href="contact.html" class="nav-link">Contact</a>
    </nav>
  </div>
</header>
      `;
    const menuCheckbox = this.querySelector('#menuToggle input');
    menuCheckbox.addEventListener('change', () => {
      if (menuCheckbox.checked) {
        document.documentElement.style.overflow = 'hidden'; // Disable scrolling
      } else {
        document.documentElement.style.overflow = ''; // Enable scrolling
      }
    });
  }
}

customElements.define('site-header', SiteHeader);
