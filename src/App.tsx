import { useState, useEffect, ChangeEvent } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import { getData } from './utils/data.utils';

import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
}


const App = () => { 

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect (() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((users) => setMonsters(users));
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users);
    }

    fetchUsers();
  },[]);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });
    setFilterMonsters(newFilteredMonsters);

  },[monsters, searchField])


  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => { 
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  // const filteredMonsters = monsters.filter((monster) => {
  //   return monster.name.toLocaleLowerCase().includes(searchField)
  // })


  return(
    <div className="App">
      <h1 className='app-title'>Monsters Search</h1>

      <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
        className ='monsters-search-box' 
      />
      <CardList monsters = {filteredMonsters}/>

      {/* <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className ='monsters-search-box' />
      <CardList monsters = {filteredMonsters}/> */}
  </div>
  ) 
}

// class App extends Component {
//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => 
//       this.setState(() => {
//         return { monsters: users };
//       }
//     ))
  
//   }

//   onSearchChange = (event) => { 
//     // console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render(){

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Search</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className ='monsters-search-box' />
//         <CardList monsters = {filteredMonsters}/>
//       </div>
//     );
//   }

// }

export default App;
