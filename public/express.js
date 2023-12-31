document.addEventListener('alpine:init', () => {
    Alpine.data('priceplansWidget', () => {
        return {
            plan: '',
            usage: '',
            new_plan_name: '',
            new_sms_price: '',
            new_call_price: '',
            selectedName: "",
            actions: "",
            total: "",
            pricePlans: [],
            updatePlanName: '',
            updateSMSPrice: '',
            updateCallPrice: '',
            deletePlanName: '',
            myPlans: [],
            showTable: false,
            showFirstSection: false,

            init() {
                axios.get('/api/price_plan')
                    .then((result) => {
                        this.pricePlans = result.data.price_plans;
                    })
                    .catch((err) => {
                        console.error("Cannot Get api/price_plan", err);
                    });
            },

            phoneBill() {
                if (!this.selectedName || !this.actions) {
                    alert("Please enter both plan name and actions.");
                    return;
                }

                axios.post('/api/price_plan/phonebill', {
                    plan_name: this.selectedName,
                    actions: this.actions
                })
                    .then(result => {
                        if (result.data.total) {
                            this.total = result.data.total;
                        } else {
                            this.total = 'error calculating total';
                        }
                    })
                    .catch(error => {
                        this.total = 'error calculating total';
                        console.error(error);
                    });

                // Clear inputs after 3 seconds
                setTimeout(() => {
                    this.selectedName = '';
                    this.actions = '';
                    this.total = '';
                }, 3000);
            }, 

            createPlan() {
                axios.post("/api/price_plan/create", {

                    plan_name: this.new_plan_name.toLowerCase(),
                    sms_price: parseFloat(this.new_sms_price).toFixed(2),
                    call_price: parseFloat(this.new_call_price).toFixed(2)
                })
                    .then(result => {
                        if (result.data.error) {
                            alert(result.data.error);
                            setTimeout(() => {
                                this.new_plan_name = '';
                                this.new_sms_price = '';
                                this.new_call_price = '';
                            }, 3000);
                        }
                        else {
                            alert(result.data.status);
                            location.reload();
                            setTimeout(() => {
                                this.new_plan_name = '';
                                this.new_sms_price = '';
                                this.new_call_price = '';
                            }, 3000);
                        }
                    });
            },
            
            updatePlan() {
                axios.post("/api/price_plan_update", {

                    plan_name: this.updatePlanName.toLowerCase(),
                    sms_price: parseFloat(this.updateSMSPrice).toFixed(2),
                    call_price: parseFloat(this.updateCallPrice).toFixed(2)
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            location.reload();
                            setTimeout(() => {
                                this.updatePlanName = '';
                                this.updateSMSPrice = '';
                                this.updateCallPrice = '';
                            }, 3000);
                        }
                        else {
                            alert(result.data.error)
                            setTimeout(() => {
                                this.updatePlanName = '';
                                this.updateSMSPrice = '';
                                this.updateCallPrice = '';
                            }, 3000);
                        }

                    });
            },

            deletePlan() {
                axios.post("/api/price_plan/delete", {

                    plan_name: this.deletePlanName.toLowerCase()
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            location.reload();
                            setTimeout(() => {
                                this.deletePlanName = '';
                            }, 3000);
                        }
                        else {
                            alert(result.data.error);
                            setTimeout(() => {
                                this.deletePlanName = '';
                            }, 3000);
                        }
                    });
            }
        }
    })
})