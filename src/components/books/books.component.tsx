import React from 'react'
import "./books.styles.css"
import { useFetch } from '../../hooks/useFetch/use-fetch';
import { apiRoutes } from '../../constants/api-route';
import { IBook } from './books.types';

export const Books: React.FC = () => {
    const {
        data: books,
        loading: getBooksLoading,
        error: getBooksError,
        refetch: refetchBooksList
    } = useFetch<IBook[]>(apiRoutes.getBookList)

    const renderList = () => {
        if (!books) return null

        return (
            <ol>
                {books.map(book => <li key={book.id}>{book.title}</li>)}
            </ol>
        )
    }

    const renderError = () => {
        if (getBooksError) return <span className='response-error'>{getBooksError}</span>
        else return null
    }

    return (
        <>
            <div className="book-actions">
                <button onClick={() => !getBooksLoading && refetchBooksList()}>Refetch Data</button>
                <button onClick={() => window.location.reload()}>Refresh the page</button>
            </div>
            {getBooksLoading
                ? <strong>Fetching Data ...</strong>
                : renderList()
            }
            {renderError()}
        </>
    )
}