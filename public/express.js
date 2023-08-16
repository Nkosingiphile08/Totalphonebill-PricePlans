document.addEventListener('alpine:init', () => { 
    Alpine.data('pricePlans', () => {
        return {

            myPlans: [],

            init(){

                axios
                    .get('/api/price_plans/')
                    .then(result => {
                        this.myPlans = result.data.pricePlans;
                    })

            },
        }
    })
})
