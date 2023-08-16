import express from 'express';
import { getpricePlans } from './db.js';

// setup server
const app = express();
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

app.use(express.static('public'))
app.use(express.json())


app.post('/phonebill', async (req, res) => {
    const pricePlan = req.body.pricePlan;
    const actions = req.body.actions;

    const totalCost = 0;

    for (const action of actions) {
        if (action === 'call') {
            totalCost += pricePlan.call_price;
        } else if (action === 'sms') {
            totalCost += pricePlan.sms_price;
        }
    }

    res.json({
        total: totalCost
    });
});

// route that return all the available price plans
app.get('/api/price_plans/', async (req, res) => {

    const pricePlans = await getpricePlans();

    res.json({
        pricePlans: pricePlans
    })
    
});


app.post("/api/phonebill/", async function (req, res) {
    
  
    const price_plan_name = req.body.price_plan
  
    // get the price plan to use starts here
    const price_plan = await db.get(`SELECT id, plan_name, sms_price, call_price 
    FROM price_plan WHERE plan_name = ?`,price_plan_name);
  
    
  
    // Use the price plan to calculate the total cost starts here
  
    if(!price_plan){
  
      res.json({
  
        error: `Invalid price plan name: ${price_plan_name}`
      })
    }else{
  
      const activity = req.body.actions;
  
      const activities = activity.split(",");
      let total = 0;
    
      activities.forEach((action) => {
        if (action.trim() == "sms") {
          total += price_plan.sms_price;
        } else if (action.trim() == "call") {
          total += price_plan.call_price;
        }
      });
    
      // Use the price plan to calculate the total cost ends here
    
      res.json({
        // status: "Success",
        total,
      });
      
    }
  });

// Calculate the most use and least
  app.get('/api/usage_statistics', async (req, res) => {
    try {
        const mostUsed = await getMostUsedPricePlan();
        const leastUsed = await getLeastUsedPricePlan();

        res.json({ mostUsed, leastUsed });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching usage statistics.' });
    }
});
