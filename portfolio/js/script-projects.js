
///////////////////////////////////////////////////////////////////////////
// PROJECT FILTER
//analogo di element.closest
var closestsElementClass = function (elem, className) {
    var node = elem;
    /*/ se il click è su un elemento figlio, allora ritorniamo
    *   la classe del genitore, saltando verso l'alto attraverso il nodo nel ciclo
    /*/
    while (node) {
        /*/ se l'elemento corrente contiene la classe che gli abbiamo passato,
        *   al momento della chiamata della funzione, allora semplicemente ritorniamo questo elemento,
        /*/
        if (node.classList.contains(className)) {
            return node; //la classe c'è — quindi la ritorniamo, terminando la funzione
        }
        /*/ se la classe non c'è, allora al posto dell'elemento corrente si prende il suo genitore
        *   e così nel ciclo finché non si trova la classe nel genitore finale,
        *   che abbiamo passato, altrimenti ritorna null
        /*/
        node = node.parentElement;
    }
    //ritorna null se la nostra classe non è presente né nell'elemento né nei suoi nodi figli
    return null;
}

//contenitore con i prodotti
var catalog = document.querySelector('.portfolio-container');
//blocco con le schede
var catalogNav = document.querySelector('.filter__tabs');
//prodotti
var catalogItems = document.querySelectorAll('.portfolio__item');

//Pulizia del blocco con gli elementi, in modo che durante il filtraggio vengano aggiunti nuovi elementi nel blocco vuoto
function removeChildren(item) {
    while (item.firstChild) {
        item.removeChild(item.firstChild)
    }
}

//aggiorniamo gli elementi nel catalogo | item è il blocco del catalogo
function updateChildren(item, children) {
    removeChildren(item);
    for (var i = 0; i < children.length; i++) {
        item.appendChild(children[i]);
    }
}

catalogNav.addEventListener('click', function (e) {
    var target = e.target;
    var item = closestsElementClass(target, 'filter__btn');
    if (item === null || item.classList.contains('is-active')) {
        return;
    }

    e.preventDefault();
    //Otteniamo il valore dall'attributo data-filter="" 
    var filterValue = item.getAttribute('data-filter');
    var previousActiveBtn = document.querySelector('.filter__btn.is-active');
    previousActiveBtn.classList.remove('is-active');
    item.classList.add('is-active');

    //Se sono selezionati TUTTI, allora li visualizziamo semplicemente tutti
    if (filterValue === 'all') {
        updateChildren(catalog, catalogItems);
        return;
    }

    //Gli elementi filtrati vengono spostati in un array
    var filteredItems = [];
    for (var i = 0; i < catalogItems.length; i++) {
        var currentItem = catalogItems[i];
        if (currentItem.getAttribute('data-category') === filterValue) {
            filteredItems.push(currentItem);
        }
    }
    updateChildren(catalog, filteredItems);
});
