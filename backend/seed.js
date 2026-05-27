require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const users = [];
    
    const user1 = await User.create({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123'
    });
    users.push(user1);

    const user2 = await User.create({
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password123'
    });
    users.push(user2);

    const user3 = await User.create({
      username: 'alex_johnson',
      email: 'alex@example.com',
      password: 'password123'
    });
    users.push(user3);

    const user4 = await User.create({
      username: 'sarah_williams',
      email: 'sarah@example.com',
      password: 'password123'
    });
    users.push(user4);

    const user5 = await User.create({
      username: 'mike_brown',
      email: 'mike@example.com',
      password: 'password123'
    });
    users.push(user5);

    console.log('Created 5 test users');

    // Create sample posts
    const posts = [];

    // Posts by John
    const post1 = await Post.create({
      title: 'Getting Started with React Hooks',
      content: 'React Hooks revolutionized the way we write React components. In this comprehensive guide, we\'ll explore useState, useEffect, and custom hooks. Hooks allow you to use state and other React features without writing a class. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. Let\'s dive deep into how hooks can make your code more readable and maintainable.',
      author: user1._id,
      authorName: user1.username
    });
    posts.push(post1);

    const post2 = await Post.create({
      title: 'Building RESTful APIs with Node.js and Express',
      content: 'Node.js and Express make it incredibly easy to build robust RESTful APIs. In this tutorial, we\'ll cover routing, middleware, error handling, and best practices for API design. We\'ll also discuss authentication with JWT, input validation, and how to structure your Express application for scalability. By the end of this guide, you\'ll be able to build production-ready APIs.',
      author: user1._id,
      authorName: user1.username
    });
    posts.push(post2);

    const post3 = await Post.create({
      title: 'Understanding MongoDB and Mongoose',
      content: 'MongoDB is a powerful NoSQL database that pairs perfectly with Node.js. Mongoose provides a elegant solution for modeling your application data. In this article, we\'ll explore schemas, models, queries, and relationships. We\'ll also cover indexing, aggregation pipelines, and performance optimization techniques. Learn how to design efficient database schemas for your applications.',
      author: user1._id,
      authorName: user1.username
    });
    posts.push(post3);

    // Posts by Jane
    const post4 = await Post.create({
      title: 'CSS Grid vs Flexbox: When to Use Which',
      content: 'Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Grid is best for two-dimensional layouts, while Flexbox excels at one-dimensional layouts. In this detailed comparison, we\'ll look at real-world examples, browser support, and performance considerations. You\'ll learn when to use each technology and how to combine them effectively.',
      author: user2._id,
      authorName: user2.username
    });
    posts.push(post4);

    const post5 = await Post.create({
      title: 'Mastering Tailwind CSS',
      content: 'Tailwind CSS is a utility-first CSS framework that can speed up your development significantly. Instead of writing custom CSS, you compose designs using pre-built utility classes. This approach leads to faster development, smaller CSS files, and more consistent designs. We\'ll explore configuration, customization, responsive design, and best practices for using Tailwind in production.',
      author: user2._id,
      authorName: user2.username
    });
    posts.push(post5);

    // Posts by Alex
    const post6 = await Post.create({
      title: 'JavaScript ES6+ Features You Should Know',
      content: 'Modern JavaScript has evolved tremendously with ES6 and beyond. Arrow functions, destructuring, spread operators, async/await, and modules have changed how we write JavaScript. In this comprehensive guide, we\'ll explore these features with practical examples. You\'ll learn how to write cleaner, more efficient code using modern JavaScript syntax and patterns.',
      author: user3._id,
      authorName: user3.username
    });
    posts.push(post6);

    const post7 = await Post.create({
      title: 'Introduction to TypeScript',
      content: 'TypeScript adds static typing to JavaScript, making your code more robust and maintainable. It catches errors at compile time rather than runtime, provides better IDE support, and makes refactoring safer. In this tutorial, we\'ll cover types, interfaces, generics, and how to integrate TypeScript into your existing projects. Discover why major companies are adopting TypeScript.',
      author: user3._id,
      authorName: user3.username
    });
    posts.push(post7);

    // Posts by Sarah
    const post8 = await Post.create({
      title: 'Web Security Best Practices',
      content: 'Security should be a top priority for every web application. From XSS and CSRF attacks to SQL injection and authentication vulnerabilities, there are many threats to consider. This guide covers essential security practices including input validation, secure authentication, HTTPS, Content Security Policy, and more. Learn how to protect your users and your application.',
      author: user4._id,
      authorName: user4.username
    });
    posts.push(post8);

    const post9 = await Post.create({
      title: 'Optimizing React Performance',
      content: 'React is fast, but large applications can suffer from performance issues. Learn about React.memo, useMemo, useCallback, code splitting, and lazy loading. We\'ll also cover the React Profiler, virtual DOM optimization, and common performance pitfalls. These techniques will help you build blazing-fast React applications that scale.',
      author: user4._id,
      authorName: user4.username
    });
    posts.push(post9);

    // Posts by Mike
    const post10 = await Post.create({
      title: 'Docker for Developers',
      content: 'Docker has revolutionized how we develop and deploy applications. Containers provide consistency across environments, making "it works on my machine" a thing of the past. In this guide, we\'ll cover Docker basics, Dockerfiles, docker-compose, and best practices for containerizing your applications. Learn how to streamline your development workflow with Docker.',
      author: user5._id,
      authorName: user5.username
    });
    posts.push(post10);

    const post11 = await Post.create({
      title: 'Git Workflow Best Practices',
      content: 'Git is an essential tool for modern development, but using it effectively requires understanding workflows and best practices. We\'ll explore branching strategies, commit messages, pull requests, and code reviews. Learn about Git Flow, GitHub Flow, and how to maintain a clean Git history. Master Git to collaborate more effectively with your team.',
      author: user5._id,
      authorName: user5.username
    });
    posts.push(post11);

    const post12 = await Post.create({
      title: 'Testing JavaScript Applications',
      content: 'Testing is crucial for maintaining code quality and preventing bugs. We\'ll cover unit testing with Jest, integration testing, end-to-end testing with Cypress, and test-driven development (TDD). Learn how to write effective tests, achieve good coverage, and integrate testing into your CI/CD pipeline. Build confidence in your code with comprehensive testing.',
      author: user5._id,
      authorName: user5.username
    });
    posts.push(post12);

    console.log('Created 12 sample posts');

    // Create sample comments
    const comments = [];

    // Comments on post 1 (React Hooks)
    await Comment.create({
      content: 'Great introduction to React Hooks! The examples are very clear and easy to follow.',
      post: post1._id,
      author: user2._id,
      authorName: user2.username
    });

    await Comment.create({
      content: 'I\'ve been using hooks for a while now and they\'ve completely changed how I write React. This is a great resource for beginners!',
      post: post1._id,
      author: user3._id,
      authorName: user3.username
    });

    await Comment.create({
      content: 'Could you do a follow-up on custom hooks? I\'d love to see more advanced examples.',
      post: post1._id,
      author: user4._id,
      authorName: user4.username
    });

    // Comments on post 4 (CSS Grid vs Flexbox)
    await Comment.create({
      content: 'This comparison is exactly what I needed! I always wondered when to use Grid vs Flexbox.',
      post: post4._id,
      author: user1._id,
      authorName: user1.username
    });

    await Comment.create({
      content: 'The real-world examples really help understand the differences. Thanks for sharing!',
      post: post4._id,
      author: user5._id,
      authorName: user5.username
    });

    // Comments on post 6 (ES6+ Features)
    await Comment.create({
      content: 'Arrow functions and destructuring have made my code so much cleaner. Great overview!',
      post: post6._id,
      author: user2._id,
      authorName: user2.username
    });

    await Comment.create({
      content: 'I didn\'t know about some of these features. Time to update my JavaScript knowledge!',
      post: post6._id,
      author: user4._id,
      authorName: user4.username
    });

    // Comments on post 8 (Web Security)
    await Comment.create({
      content: 'Security is so important and often overlooked. This is a must-read for all developers.',
      post: post8._id,
      author: user1._id,
      authorName: user1.username
    });

    await Comment.create({
      content: 'The section on XSS prevention was particularly helpful. Implementing these practices now!',
      post: post8._id,
      author: user3._id,
      authorName: user3.username
    });

    await Comment.create({
      content: 'Would love to see more content on authentication best practices!',
      post: post8._id,
      author: user5._id,
      authorName: user5.username
    });

    // Comments on post 10 (Docker)
    await Comment.create({
      content: 'Docker has been a game-changer for our team. This guide is perfect for getting started.',
      post: post10._id,
      author: user1._id,
      authorName: user1.username
    });

    await Comment.create({
      content: 'The docker-compose examples are really helpful. Thanks for this comprehensive guide!',
      post: post10._id,
      author: user2._id,
      authorName: user2.username
    });

    // Comments on post 12 (Testing)
    await Comment.create({
      content: 'Testing has improved our code quality significantly. Great overview of different testing approaches!',
      post: post12._id,
      author: user3._id,
      authorName: user3.username
    });

    await Comment.create({
      content: 'The TDD section is excellent. I\'m going to start practicing this approach.',
      post: post12._id,
      author: user4._id,
      authorName: user4.username
    });

    console.log('Created 13 sample comments');

    console.log('\n' + '='.repeat(60));
    console.log('✅ Database seeded successfully!');
    console.log('='.repeat(60));
    
    console.log('\n📝 Test Accounts Created:\n');
    console.log('1. John Doe');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('   Posts: 3 (React, Node.js, MongoDB)');
    
    console.log('\n2. Jane Smith');
    console.log('   Email: jane@example.com');
    console.log('   Password: password123');
    console.log('   Posts: 2 (CSS Grid, Tailwind)');
    
    console.log('\n3. Alex Johnson');
    console.log('   Email: alex@example.com');
    console.log('   Password: password123');
    console.log('   Posts: 2 (ES6+, TypeScript)');
    
    console.log('\n4. Sarah Williams');
    console.log('   Email: sarah@example.com');
    console.log('   Password: password123');
    console.log('   Posts: 2 (Security, Performance)');
    
    console.log('\n5. Mike Brown');
    console.log('   Email: mike@example.com');
    console.log('   Password: password123');
    console.log('   Posts: 3 (Docker, Git, Testing)');

    console.log('\n📊 Summary:');
    console.log('   Total Users: 5');
    console.log('   Total Posts: 12');
    console.log('   Total Comments: 13');
    
    console.log('\n🌐 Access the application:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Backend:  http://localhost:5000');
    
    console.log('\n💡 All accounts use the same password: password123');
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedData();
