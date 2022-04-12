import PropTypes from "prop-types";

export default function CreateBlog({
    title, author, url,
    setTitle, setAuthor, setUrl,
    handleCreateBlog,
}) {



    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>

                title:
                <input 
                    onChange={({target}) => {setTitle(target.value)}} 
                    value={title}
                    name="title"
                    type="text"
                />

                author:
                <input 
                    onChange={({target}) => {setAuthor(target.value)}} 
                    value={author}
                    name="url"
                    type="text"
                />

                url:
                <input 
                    onChange={({target}) => {setUrl(target.value)}} 
                    value={url}
                    name="url"
                    type="text"
                />

                
                <button>Add blog</button>
            </form>
        
      </div>
    )
}

CreateBlog.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}