const usersData = require('../data/users.json');
const postsData = require('../data/posts.json');

exports.seed = function(knex) {
    return (async function() {
        await knex('posts').del();
        await knex('users').del();

        await knex('users').insert(usersData);

        const postInserts = [];

        for (const post of postsData) {
            const { author } = post;
            postInserts.push(insertPostRecord(knex, author, post));
        }

        await Promise.all(postInserts);
    })();
};

async function insertPostRecord(knex, username, post) {
    const user = await knex('users')
        .where({ username })
        .first();

    await knex('posts').insert({
        id: post.id,
        title: post.title,
        body: post.body,
        user_id: user.id,
    });
}
