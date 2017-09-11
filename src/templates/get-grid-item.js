/**
 * getGridItem - return the HTML for a given API item
 *
 * @return {String} the HTML String
 */
export default (item, isFavorite) => {
  const { id, bitly_url, images } = item;
  const stringifiedObject = JSON.stringify({
    id,
    bitly_url,
    images: {
      downsized: {
        url: images.downsized.url
      },
    },
  })
  const favoriteClass = isFavorite ? 'icon-btn__favorite--active' : '';
  const favoriteText = isFavorite ? 'Remove from favorites' : 'Add to favorites';
  return `
    <div class="grid__panel" data-id="${item.id}">
      <div class="grid__panel-content">
        <img
          class="grid__panel-image"
          src="${item.images.downsized.url}"
        >
      </div>
      <div class="grid__panel-action">
        <button
          alt="${favoriteText}"
          class="grid__panel-action-btn icon-btn icon-btn__favorite ${favoriteClass}"
          data-object='${stringifiedObject}'
        >
          &nbsp;
        </button>
        <button
          alt="Copy to clipboard"
          data-clipboard-text="${bitly_url}"
          class="grid__panel-action-btn icon-btn icon-btn__copy"
        >
          &nbsp;
        </button>
      </div>
    </div>
  </div>
  `;
}
