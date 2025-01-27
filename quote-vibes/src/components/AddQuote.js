import React from 'react';

function AddQuote() {
    return (
        <div>
            <h2>Add a Quote</h2>
            <form>
                <input type="text" placeholder="Enter quote" />
                <input type="text" placeholder="Enter author" />
                <button type="submit">Add Quote</button>
            </form>
        </div>
    );
}

export default AddQuote;
