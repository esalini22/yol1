const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
      
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {
                likes: 1,
            }
        ]
      
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, blogs[0].likes)
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                likes: 2,
            },
            {
                likes: 3,
            }
        ]
      
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })
})

test('favorite blog', () => {
    const blogs = [
        {
            likes: 2,
        },
        {
            likes: 3,
        }
    ]
  
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, blogs[1])
})
  
test('most blogs', () => {
    const blogs = [
        {
            likes: 2,
            author: "yo"
        },
        {
            likes: 3,
            author: "yo"
        },
        {
            likes: 2,
            author: "tu"
        },
        {
            likes: 3,
            author: "el"
        },
    ]
  
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, "yo")
})
  
test('most likes', () => {
    const blogs = [
        {
            likes: 2,
            author: "yo"
        },
        {
            likes: 3,
            author: "yo"
        },
        {
            likes: 2,
            author: "tu"
        },
        {
            likes: 3,
            author: "el"
        },
    ]
  
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, "yo")
})