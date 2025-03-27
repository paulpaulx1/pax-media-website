// site-header.js
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<header class="site-header">
  <div class="header-content">
    <div class="logo">
      <a href="index.html">Pax Media</a>
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
          <a href="index.html#about" class="nav-link">About</a>
        </li>
        <li>
          <a href="index.html#work" class="nav-link">Work</a>
        </li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    </div>

    <nav class="desktop-navigation">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#work">Work</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
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