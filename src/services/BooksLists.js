import axios from "axios";

export class BookLists {
    static getBooks(){
        const dataUrl = 'https://gutendex.com/books'
        return axios.get(dataUrl)
    }

    static getMoreBooks(nextDataUrl){
        return axios.get(nextDataUrl)
    }

}