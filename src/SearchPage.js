import Input from '@material-ui/core/Input';

import { firestore } from './Auth';
import { SearchResult } from './SearchResult';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

export function SearchPage(props){

    const [searchQuery, setSearchQuery] = useState("");

    let usersRef = firestore.collection("users").where("username","==",searchQuery);

    function handleChange(e){
        setSearchQuery(e.target.value);
    }

    let [results] = useCollectionData(usersRef, {idField:'id'});

    return (<div id="SearchPage" className="hide" ref={props.searchRef}>
       <div id="searchbarContainer">
            <Input color="primary" id="searchbar" value={searchQuery} onChange={e => handleChange(e)} fullWidth placeholder="Enter Name"/>
            <p>Names are case-sensitive. Results will appear once a <b>definite</b> match is found</p>
       </div>
       <div id="searchResults">
            {results && results.map(result => <SearchResult key={result.id} resultData={result}/>)}
       </div>
    </div>)
}