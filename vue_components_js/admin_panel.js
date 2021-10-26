const AdminPanel = Vue.component(
    "admin-panel", {
        template: "#admin-panel",
        props: [],
        mounted: function() {
            const form = document.querySelector('#create-user-form');
            form.addEventListener('submit', this.createUser);
        },
        methods: {
            createUser: async function(event){
                event.preventDefault();
                const data = new FormData(event.target);
                const dataToSend = Object.fromEntries(data.entries());
                console.log(dataToSend)
                //const request = await session.postRequest('/users', dataToSend)
            }
        }
    }
)