import { clearSearch, getSearch, getUserInfo, setSearch } from "../localStorage";


const Header = {
    after_render: async () =>{
        const home = document.location.hash;
        if (home === "#/") {
            document.getElementById('search-form')
            .addEventListener("submit", async ()=>{
            const searchString = document.getElementById('search').value
           setSearch(searchString)
           document.location.hash = '/';
        });
            document.getElementById('clear')
            .addEventListener("click", async ()=>{
            clearSearch();
            document.location.hash = '/';
    });

        }
    },
    render: () => {
        const search = getSearch();
        const {name, isAdmin} = getUserInfo();
        const home = document.location.hash;
        return`
                <div>
                    <a href="/#/" class="brand">MACKAM</a> 
                </div>
                ${home === "#/" 
                    ? `<div class="search-container">
                    <form id="search-form">
                        <input id="search" type="text" placeholder="Searching ${search}" name="search">
                        <button id="search" type="submit"><i class="fa fa-search"></i></button>
                        <button id="clear"><i class="fa fa-close"></i></button>
                    </form>
                </div>`
                    : ''}
                <div>
                ${name 
                    ? `<a href="/#/profile">${name}</a>`
                    : `<a href="/#/signin">Sign-In</a>`}
                        <a href="/#/cart">Cart</a>
                ${isAdmin
                    ? `<a href="/#/dashboard">Dashboard</a>`
                    :''} 
                </div>
        `
    },
};
export default Header; 