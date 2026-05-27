const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  username: 'testuser_' + Date.now(),
  email: `testuser${Date.now()}@example.com`,
  password: 'test123456'
};

let authToken = '';
let userId = '';
let postId = '';
let commentId = '';

async function testAPI() {
  console.log('\n🚀 Starting API Tests...\n');

  try {
    // Test 1: Register new user
    console.log('1️⃣  Testing User Registration...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
    authToken = registerResponse.data.token;
    userId = registerResponse.data.user.id;
    console.log('✅ Registration successful!');
    console.log(`   Username: ${registerResponse.data.user.username}`);
    console.log(`   Email: ${registerResponse.data.user.email}`);
    console.log(`   Token: ${authToken.substring(0, 20)}...`);

    // Test 2: Login
    console.log('\n2️⃣  Testing User Login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful!');
    console.log(`   Token received: ${loginResponse.data.token.substring(0, 20)}...`);

    // Test 3: Get current user
    console.log('\n3️⃣  Testing Get Current User...');
    const meResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ User data retrieved!');
    console.log(`   Username: ${meResponse.data.username}`);
    console.log(`   Email: ${meResponse.data.email}`);

    // Test 4: Create a blog post
    console.log('\n4️⃣  Testing Create Blog Post...');
    const postData = {
      title: 'My First Test Post',
      content: 'This is a test post created by the automated test script. It contains some sample content to verify that the blog post creation functionality is working correctly.'
    };
    const createPostResponse = await axios.post(`${API_URL}/posts`, postData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    postId = createPostResponse.data._id;
    console.log('✅ Post created successfully!');
    console.log(`   Post ID: ${postId}`);
    console.log(`   Title: ${createPostResponse.data.title}`);
    console.log(`   Author: ${createPostResponse.data.authorName}`);

    // Test 5: Get all posts
    console.log('\n5️⃣  Testing Get All Posts...');
    const allPostsResponse = await axios.get(`${API_URL}/posts`);
    console.log('✅ Posts retrieved!');
    console.log(`   Total posts: ${allPostsResponse.data.length}`);

    // Test 6: Get single post
    console.log('\n6️⃣  Testing Get Single Post...');
    const singlePostResponse = await axios.get(`${API_URL}/posts/${postId}`);
    console.log('✅ Post retrieved!');
    console.log(`   Title: ${singlePostResponse.data.title}`);

    // Test 7: Update post
    console.log('\n7️⃣  Testing Update Post...');
    const updateData = {
      title: 'My Updated Test Post',
      content: 'This post has been updated by the test script.'
    };
    const updatePostResponse = await axios.put(`${API_URL}/posts/${postId}`, updateData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Post updated successfully!');
    console.log(`   New title: ${updatePostResponse.data.title}`);

    // Test 8: Create a comment
    console.log('\n8️⃣  Testing Create Comment...');
    const commentData = {
      content: 'This is a test comment on the post!',
      postId: postId
    };
    const createCommentResponse = await axios.post(`${API_URL}/comments`, commentData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    commentId = createCommentResponse.data._id;
    console.log('✅ Comment created successfully!');
    console.log(`   Comment ID: ${commentId}`);
    console.log(`   Content: ${createCommentResponse.data.content}`);

    // Test 9: Get comments for post
    console.log('\n9️⃣  Testing Get Comments...');
    const commentsResponse = await axios.get(`${API_URL}/comments/post/${postId}`);
    console.log('✅ Comments retrieved!');
    console.log(`   Total comments: ${commentsResponse.data.length}`);

    // Test 10: Delete comment
    console.log('\n🔟 Testing Delete Comment...');
    await axios.delete(`${API_URL}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Comment deleted successfully!');

    // Test 11: Delete post
    console.log('\n1️⃣1️⃣  Testing Delete Post...');
    await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Post deleted successfully!');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ALL TESTS PASSED! 🎉');
    console.log('='.repeat(50));
    console.log('\n✅ Test Summary:');
    console.log('   ✓ User Registration');
    console.log('   ✓ User Login');
    console.log('   ✓ Get Current User');
    console.log('   ✓ Create Blog Post');
    console.log('   ✓ Get All Posts');
    console.log('   ✓ Get Single Post');
    console.log('   ✓ Update Post');
    console.log('   ✓ Create Comment');
    console.log('   ✓ Get Comments');
    console.log('   ✓ Delete Comment');
    console.log('   ✓ Delete Post');
    console.log('\n📝 Test Account Created:');
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Password: ${testUser.password}`);
    console.log('\n🌐 Application URLs:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Backend:  http://localhost:5000');
    console.log('\n💡 You can login with the test account or use:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Test Failed!');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data.message || JSON.stringify(error.response.data)}`);
    } else {
      console.error(`   Error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Run tests
testAPI();
