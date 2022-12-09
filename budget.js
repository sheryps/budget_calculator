
const itemCtrl = (function(){
    const Item = function(id,description,amount){
        this.id=id;
        this.description=description;
        this.amount=amount;
    }
    const data={items:[]}
    //public
    return{
        logData:function(){
            return data;
        },
        addMoney:function(description,amount){
            //create random id
            let ID = itemCtrl.createID()
            //create new item
            newMoney = new Item(ID,description,amount);
            //push it into array
            data.items.push(newMoney)
            return newMoney
        },
        createID:function(){
            //create random id number between 0 and 10000
            const idNum = Math.floor(Math.random()*10000);
            return idNum
        },
        getIdNumber:function(item){
            //get item id
            const amountId = (item.parentElement.id)
            //break id into array
            const itemArr = amountId.split('-');
            //get id number
            const id = parseInt(itemArr[1])
            return id
        },
        deleteAmountArr:function(id){
            //get all the ids
            const ids = data.items.map(function(item){
                //return item with id
                return item.id
            });
            //get index
            const index = ids.indexOf(id)
            //remove item
            data.items.splice(index,1)
        }
    }
})();

//UI

const ULCtrl =(function(){

    const UISelectors={
        incomeBtn:'#add_income',
        expenseBtn:'#add_expense',
        description:'#description',
        amount:'#amount',
        moneyEarned:'#amount_earned',
        moneyAvailable:'#amount_available',
        moneySpent:'#amount_spent',
        incomeList:'#income_container',
        expenseList:'#expense_container',
        incomeItem:'.income_amount',
        expenseItem:'.expense_amount',
        itemsContainer:'.items_container'
    }
    //public
    return{
        getSelectors:function(){
            return UISelectors
        },
        getDescriptionInput:function(){
            return{
                descriptionInput:document.querySelector(UISelectors.description).value
            }
        },
        getValueInput:function(){
            return{
                amountInput:document.querySelector(UISelectors.amount).value
            }
        },
        addIncomeItem:function(item){
            //create new dic
            const div = document.createElement('div')
            //add class
            div.classList = 'item income';
            //add id to item
            div.id = `item-${item.id}`
            //add html
            div.innerHTML =`
            <h4>${item.description}</h4>
            <div class="item_income">
            <p class="symbol">₹</p>
            <span class="income_amount">${item.amount}</span>
          </div>
          <i id="far" class="far fa-solid fa-trash"></i>`;
          //insert income into list
          document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend',div);
        },
        clearInputs:function(){
            document.querySelector(UISelectors.description).value='';
            document.querySelector(UISelectors.amount).value=''
        },
        updateEarned:function(){
            //all income elements
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            //array with all incomes
            const incomeCount = [...allIncome].map(item=>+item.innerHTML);
            //calculate total
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b;
            },0)
            //display value in total earned
            const earnedTotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2)

        },
        addExpenseItem:function(item){
                        //create new dic
                        const div = document.createElement('div')
                        //add class
                        div.classList = 'item expense';
                        //add id to item
                        div.id = `item-${item.id}`
                        //add html
                        div.innerHTML =`
                        <h4>${item.description}</h4>
                        <div class="item_expense">
                        <p class="symbol">₹</p>
                        <span class="expense_amount">${item.amount}</span>
                      </div>
                      <i id="far" class="far fa-solid fa-trash"></i>`;
                      //insert income into list
                      document.querySelector(UISelectors.expenseList).insertAdjacentElement('beforeend',div);
        },
        updateSpent:function(){
            //all expense elements
            const allExpense = document.querySelectorAll(UISelectors.expenseItem);
            //array with all expense
            const expenseCount = [...allExpense].map(item=>+item.innerHTML);
            //calculate total
            const expenseSum = expenseCount.reduce(function(a,b){
                return a+b;
            },0)
            //display value in total spent
            const expenseTotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum.toFixed(2)
        },
        updateAvailable:function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            const avail = available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML)).toFixed(2)
            return avail
        },
        deleteAmount:function(id){
            //create the id we will select
            const amountId = `#item-${id}`;
            //select the amount with th id we passed
            const amountDelete = document.querySelector(amountId)
            //remove from ui
            amountDelete.remove()
        }
    }
})();

//APP 

const App = (function(){
    //event listeners
    const loadEventListeners = function(){
        //get ui selectors
        const UISelectors = ULCtrl.getSelectors()
        //add new income
        document.querySelector(UISelectors.incomeBtn).addEventListener('click',addIncome)
        //add new expense
        document.querySelector(UISelectors.expenseBtn).addEventListener('click',addExpense)
        //delete item
        document.querySelector(UISelectors.itemsContainer).addEventListener('click',deleteItem)
    }

    //add new income
    const addIncome = function(){
        //get description and amount values
        const description = ULCtrl.getDescriptionInput()
        const amount = ULCtrl.getValueInput()
        //if inputs are not empty
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            //add nw item
            const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput)
            //add item to list
            ULCtrl.addIncomeItem(newMoney)
            //clear inputs
            ULCtrl.clearInputs()
            //earned amount
            ULCtrl.updateEarned()
            //calculate money available
            ULCtrl.updateAvailable()
            //check data
            // const checkData = itemCtrl.logData()
            // console.log(checkData);

        }

    }

    //add new expense
    const addExpense = function(){
        //get description and amount values
        const description = ULCtrl.getDescriptionInput()
        const amount = ULCtrl.getValueInput()
        //if inputs are not empty
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            avail = ULCtrl.updateAvailable()
            if (avail>=amount.amountInput){
                //add nw item
                const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput)
                //check whether available is greater than spent
                //add item to list
                ULCtrl.addExpenseItem(newMoney)
                //clear inputs
                ULCtrl.clearInputs()
                //expense amount
                ULCtrl.updateSpent()
                //calculate money available
                ULCtrl.updateAvailable()
            }else{
                alert('You dont have sufficent balance,please try again')
                //clear inputs
                ULCtrl.clearInputs()
            }

    }
    }
    //delete item

    const deleteItem = function(e){
        if(e.target.classList.contains('far')){
            //get item id
            const Id = itemCtrl.getIdNumber(e.target)
            //delete amount from ui
            ULCtrl.deleteAmount(Id);
            //delete from data
            itemCtrl.deleteAmountArr(Id)
            //income amount
            ULCtrl.updateEarned()
             //expense amount
            ULCtrl.updateSpent()
            //calculate money available
            ULCtrl.updateAvailable()
        }
    }

    //init function
    return{
        init:function(){

            loadEventListeners()
        }
    }

})(itemCtrl,ULCtrl);

App.init();