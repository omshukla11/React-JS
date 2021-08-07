import React, { Component } from 'react'
import { ContactItem } from './ContactItem'
import Starred from '../data/star.json'

const editJsonFile = require("edit-json-file");
let file = editJsonFile("src\data\star.json");

function SortListBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        }
        else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function onStar(li) {
    Starred.push(li);
    // Starred = Starred.sort(SortListBy("first_name"));
}

function removeStar(li) {
  var index = Starred.indexOf(li);
  if (index > -1) {
    Starred.splice(index, 1);
    // Starred = Starred.sort(SortListBy("first_name"));
  }
}

export default class Contacts extends Component{

    state = {
        loading: true,
        contacts: null
    };

    async componentDidMount() {
        const url = 'https://gist.githubusercontent.com/YatharthVyas/93b13e4fd8687ecb6d692fedf852299a/raw/e9515185ca107d05dad1032c60917e2f511a805c/contact.json';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ contacts: data, loading: false });
    }
    

    render() {

        console.log(Starred);
        
        if (this.state.loading) {
            return <h1 className="text-center">Loading...</h1>
        }

        if (!this.state.contacts) {
            return <h1 className="text-center">Contact Not Found</h1>
        }

        const sorted_contacts = this.state.contacts.sort(SortListBy("first_name"));
        const sorted_star = Starred.sort(SortListBy("first_name"));
        console.log(sorted_star);
        
        return (
            <div className="container">
                <h3 className="text-center my-3">Contact List</h3>
                <ol>
                {sorted_star.map((contact) => {
                    return <li key={contact.id}><ContactItem contactinfo={contact} onStar={onStar} removeStar={removeStar}/></li>
                })}
                {sorted_contacts.map((contact) => {
                    if (Starred.includes(contact) == false) {
                        return <li key={contact.id}><ContactItem contactinfo={contact} onStar={onStar} removeStar={removeStar}/></li>
                    }
                })}
                </ol>
            </div>
        )
    }
}