import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
    after_render: () =>{},
    render: () =>{
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'dasboard'})}
            <div class ="dashboard-content">
                kkkkk
        </div>
        `;
    },
};

export default DashboardScreen;