const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    let sum = 0
    for(let i=0; i<blogs.length;++i){
        sum += blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let fav = blogs[0]
    for(let i=0; i<blogs.length;++i){
        if(blogs[i].likes > maxLikes){
            maxLikes = blogs[i].likes
            fav = blogs[i]
        }
    }
    return fav
}

const mostBlogs = (blogs) => {
    let authorBlogs = {};
    for(let i=0; i<blogs.length;++i){
        if(blogs[i].author in authorBlogs){
            authorBlogs[blogs[i].author] += 1
        }
        else{
            authorBlogs[blogs[i].author] = 1
        }
    }

    let maxBlogs = 0
    let maxAuthor = blogs[0].author
    for (const [key, value] of Object.entries(authorBlogs)) {
        if(value > maxBlogs){
            maxBlogs = value
            maxAuthor = key
        }
    }
    return maxAuthor
}

const mostLikes = (blogs) => {
    let authorBlogs = {};
    for(let i=0; i<blogs.length;++i){
        if(blogs[i].author in authorBlogs){
            authorBlogs[blogs[i].author] += blogs[i].likes
        }
        else{
            authorBlogs[blogs[i].author] = blogs[i].likes
        }
    }

    let maxLikes = 0
    let maxAuthor = blogs[0].author
    for (const [key, value] of Object.entries(authorBlogs)) {
        if(value > maxLikes){
            maxLikes = value
            maxAuthor = key
        }
    }
    return maxAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}