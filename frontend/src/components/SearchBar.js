
const SearchBar = {
    after_render: () => {
        document.getElementById('search-form"')
        .addEventListener('submit', async (e) =>{
            e.preventDefault();
            document.location.hash = '"/#/signin"';
        });
    },
    render: () => {
        return`
        <div class="search-container">
        <form id="search-form">
          <input id="search" type="text" placeholder="Search.." name="search">
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
        </div>
        `
    },
};
export default SearchBar; 