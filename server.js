const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/v1/users/:id", (req, res) => {
    let { id } = req.params;
    try {
        let users = JSON.parse(fs.readFileSync("./data/users.json"));
        let user = users.find((e, i) => e.id === Number(id));
        if (!user) {
            res.json({
                message: "User not found",
            });
        } else {
            res.json({
                user: user,
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.get("/api/v1/users", (req, res) => {
    try {
        let users = JSON.parse(fs.readFileSync("./data/users.json"));
        res.json({
            users: users,
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.post("/api/v1/users", (req, res) => {
    let { name, username, email, address, phone, website, company } = req.body;
    let user = {
        id: Math.floor(Math.random() * 1000000000000000),
        name,
        username,
        email,
        address: {
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
        },
        phone,
        website,
        company: {
            name: company.name,
            catchPhrase: company.catchPhrase,
            bs: company.bs,
        },
    };
    try {
        let users = JSON.parse(fs.readFileSync("./data/users.json"));
        users.push(user);
        fs.writeFileSync("./data/users.json", JSON.stringify(users));
        res.json({
            message: "Create user successfully",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.put("/api/v1/users/:id", (req, res) => {
    let { id } = req.params;
    let { email } = req.body;
    try {
        let users = JSON.parse(fs.readFileSync("./data/users.json"));
        let userIndex = users.findIndex((e, i) => e.id === Number(id));
        if (userIndex === -1) {
            res.json({
                message: "User not found",
            });
        } else {
            users[userIndex].email = email;
            fs.writeFileSync("./data/users.json", JSON.stringify(users));

            res.json({
                message: "Update user successfully",
                user: users[userIndex],
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.delete("/api/v1/users/:id", (req, res) => {
    let { id } = req.params;
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let updatedUsers = users.filter((user, index) => user.id != id);
    fs.writeFileSync("./data/users.json", JSON.stringify(updatedUsers));
    res.json({
        message: "Delete user successfully",
    });
});

//
//
app.get("/api/v1/posts/:id", (req, res) => {
    // logic
    let { id } = req.params;

    try {
        let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
        let post = posts.find((e, i) => e.id === Number(id));
        if (!post) {
            res.json({
                message: "post not found",
            });
        } else {
            res.json({
                post: post,
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.get("/api/v1/posts", (req, res) => {
    try {
        let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
        res.json({
            posts: posts,
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.post("/api/v1/posts", (req, res) => {
    let { title, body } = req.body;
    let user = {
        userId: 11,
        id: Math.floor(Math.random() * 1000000000000000),
        title,
        body,
    };
    try {
        let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
        posts.push(user);
        fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
        res.json({
            message: "Create posts successfully",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.put("/api/v1/posts/:id", (req, res) => {
    let { id } = req.params;
    let { title } = req.body;
    let { body } = req.body;

    try {
        let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
        let postIndex = posts.findIndex((e, i) => e.id === Number(id));
        if (postIndex === -1) {
            res.json({
                message: "post not found",
            });
        } else {
            posts[postIndex].title = title;
            posts[postIndex].body = body;
            fs.writeFileSync("./data/posts.json", JSON.stringify(posts));

            res.json({
                message: "Update post successfully",
                post: posts[postIndex],
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

app.delete("/api/v1/posts/:id", (req, res) => {
    let { id } = req.params;
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    let updatedPosts = posts.filter((user, index) => user.id != id);
    fs.writeFileSync("./data/posts.json", JSON.stringify(updatedPosts));
    res.json({
        message: "Delete post successfully",
    });
});

app.get("/api/v1/users/:id/posts", (req, res) => {
    let { id } = req.params;
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    let postUser = posts.filter((post) => post.userId == id);
    res.json({ postUser });
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
