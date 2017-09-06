/**
 * getGridItem - return the HTML for a given API item
 *
 * @return {String} the HTML String
 */
export default (item) => {
  console.log(item.images)
  return `
    <div class="grid__panel" data-id="${item.id}">
      <div class="grid__panel-content">
        <img
          class="grid__panel-image"
          src="${item.images.downsized.url}"
        >
      </div>
      <div class="grid__panel-action">
        <button class="grid__panel-action-btn icon-btn icon-btn__favorite icon-btn__favorite--active">&nbsp;</button>
        <button class="grid__panel-action-btn icon-btn icon-btn__copy">&nbsp;</button>
      </div>
    </div>
  </div>
  `;
}
