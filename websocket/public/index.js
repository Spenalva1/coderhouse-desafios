const form            = document.querySelector('#productForm');
const titleInput      = document.querySelector('#title');
const priceInput      = document.querySelector('#price');
const thumbnailInput  = document.querySelector('#thumbnail');
const productsTable     = document.querySelector('#productsCtn');
const socket = io();

const productTemplate = Handlebars.compile(`
  {{#if productsExists}}
    <div class="bg-dark">
      <div class="row border-bottom">
        <div class="col-4 p-4 fw-bold">Nombre</div>
        <div class="col-4 p-4 fw-bold">Precio</div>
        <div class="col-4 p-4 fw-bold">Foto</div>
      </div>
      {{#each products}}
      <div class="row border-bottom">
        <div class="col-4 p-4">{{this.title}}</div>
        <div class="col-4 p-4">{{this.price}}</div>
        <div class="col-4 p-4">
          <img width="50" src="{{this.thumbnail}}" />
        </div>
      </div>
      {{/each}}
    </div>
  {{else}}
    <div class="alert alert-warning fw-bold" role="alert"> No se encontraron productos</div>
  {{/if}}
`);

function renderProducts(products = []) {
  const html = productTemplate({products, productsExists: !!products.length});
  productsTable.innerHTML = html;
}

socket.on('products', renderProducts);

form.addEventListener('submit', event => {
  event.preventDefault();
  const title = titleInput.value;
  const price = priceInput.value;
  const thumbnail = thumbnailInput.value;
  socket.emit('productAdd', {title, price, thumbnail});
  form.reset();
});