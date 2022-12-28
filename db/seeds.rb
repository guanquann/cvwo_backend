# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Category.create([
    { cat: "Help"},
    { cat: "Showcase"},
    { cat: "Discussion"},
    { cat: "News"},
    { cat: "Resources"},
    ]
)

User.create([
    { username: "user1", password: "123456789", email: "user1@gmail.com"}
])

PostThread.create([
    { title: "General", description: "Random stuff here!", user_id: 1 },
    { title: "Education", description: "Help and advise for your work. No directly copying please...", user_id: 1 },
    { title: "Finance", description: "Manage your money here $", user_id: 1 },
    { title: "Food", description: "Yummmmmmmmmy", user_id: 1 },
])

Post.create([
    { title: "Welcome to MyForum!", description: "This is a place for you to write down practically anything! Have fun :D", category_id: 3, post_thread_id: 1, user_id: 1}
])