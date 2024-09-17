first we eed to create cotetprovider is to import  state to more than one component 
 
 context provider is to manage state globally 
context:
 const testContext() = createContext();
provider:
 export const testProvider = ({children }) => {
    information logic
 }

return (
    <testProvider.Provider value = {{}}>

)

create a custom hook (use) to reuse it in several components and exported 
use:
export const useTest = () => useContext(testContext)

const handleClicke = () => setIsClicked((prevState) => ({...prevState, visibleCanvas: true}))
 if we need to change the className style of an elemrnt we do literal ${}

 src={logo} this indicates to img 
 but if we need to change the imf incase of activeMenue 

src{activeMenuw ? logo : logoIcon}
to generate html and jsx and apply css formate we need to use template literal those are diffrent  of formatting  JSX and css for styling 

className={`logo ${activeMenu ? "expanded" : "collapsed"}`}

Generate new goals when clicking on button :

define state with initial value an [] as there are more than one element 

const[ele, setEle] = useState([]);
then generate id for the goal 
first we need a condition which is if the arry has an ele add 1 to the last id ele or is empty set the id to 1
const id = ele.length ? ele[ele.length -1].id +1 : 1 ;

then create new ele has the id and description textarea andif it is completed or not we create an object beacuse it has omre than one property 
the id : which indicates to unique identifire that generated 
chechbox which sets to false as an initial value 
and deecription which set to state variable
const[eleDescription, setEleDescription]= useState('')
const newEle = {id, completed: flase, description: eleDescription}

Now to toggle the state of the input each element  in the goals arry
we need to update the state of the eles arry atribute ddescription as we need the updater function 
as it is an arry we need to iterate the update over each element we use map method 
the condition if the goalid matches with id of the selected input then returns an object to toggle the completed state !goal.completed and use spread operator to preserve the other arry "eles" properties when updating operations occurs else return the goal 
const toggleGoal = (id) => {
    setEles(eles.map (ele =>
    ele.id=== id  ? {...ele ,completed !ele.completed} : ele ;
    ))
}

open a speacific element with id 

define a state and updated 

const[selectGoal, setSelectGoal]= useState(null);

create a function to handle selected goal
pass id as parameter to match the selected goal.id  
irst we need to create a condition to test if the id is not null 
to not update the state as we pass a null value
if not then create a goal varaibe to find the goal.id matches with goal.id in goals array 
if there is match then set this founded goal to the updater function to open the selected goal.id 
const openGoal = (id) => {
if (id === null){
setSelectGoal(null);}
else {
const goal = goals.find(goal => goal.id === id);
setSelectGoal(goal);
}

}