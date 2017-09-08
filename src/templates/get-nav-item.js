export default (route) => `
  <a
    class="header__nav-item"
    href="${route.hash}"
  >
    ${route.title}
  </a>
`;
