const postsPerPage = 6;
const posts = [
  {
    category: "tech",
    title: "Understanding JavaScript Closures",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    description: "A beginner's introduction to closures in JS and common use-cases.",
    date: "2025-06-10",
  },
  {
    category: "travel",
    title: "Top Destinations in Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80",
    description: "Explore the breathtaking wonders and cities you must visit in Europe.",
    date: "2025-04-18",
  },
  {
    category: "food",
    title: "Delicious Vegan Recipes",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80",
    description: "Try these easy, colorful, and tasty vegan recipes for every meal.",
    date: "2025-04-22",
  },
  {
    category: "tech",
    title: "Introduction to React Hooks",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    description: "Learn how React Hooks simplify state management in modern UIs.",
    date: "2025-05-12",
  },
  {
    category: "travel",
    title: "Backpacking Through South America",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Budget backpacking adventures and unforgettable sights in South America.",
    date: "2025-03-15",
  },
  {
    category: "food",
    title: "Mastering French Pastries",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    description: "Baking the world's most delicate French pastry classics in your kitchen.",
    date: "2025-06-01",
  },
  {
    category: "tech",
    title: "Getting Started with TypeScript",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=600&q=80",
    description: "Quickly boost your code with Type safety and smart autocompletion.",
    date: "2025-06-15",
  },
  {
    category: "travel",
    title: "Cultural Festivals Around the World",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    description: "A guide to vibrant, colorful, and awe-inspiring global festivals.",
    date: "2025-05-01",
  },
  {
    category: "food",
    title: "Healthy Smoothie Bowls",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
    description: "Energize your morning with superfood bowls, fruits, and healthy toppings.",
    date: "2025-03-27",
  },
  {
    category: "tech",
    title: "Building Responsive Web Layouts",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    description: "Techniques to craft web designs that work everywhere, every time.",
    date: "2025-05-28",
  },
];

let currentPage = 1;
let currentCategory = "all";
let currentSearchTerm = "";

const postsContainer = document.getElementById("posts");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

function filterPosts() {
  return posts.filter(post => {
    const cat = currentCategory === "all" || post.category === currentCategory;
    const search = post.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return cat && search;
  });
}

function renderPosts() {
  const filteredPosts = filterPosts();
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsToShow = filteredPosts.slice(start, end);
  postsContainer.innerHTML = "";
  if (postsToShow.length === 0) {
    postsContainer.innerHTML = '<p style="grid-column: 1/-1;text-align:center;opacity:0.7;">No posts found.</p>';
    pageInfo.textContent = "";
    prevBtn.disabled = true; nextBtn.disabled = true;
    return;
  }
  postsToShow.forEach(post => {
    const div = document.createElement("article");
    div.className = "post-card";
    div.innerHTML = `
      <img class="post-image" src="${post.image}" loading="lazy" alt="${post.title}" />
      <div class="post-content">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-description">${post.description}</p>
        <div class="post-date">${new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric', month: 'short', day: '2-digit'
        })}</div>
      </div>
    `;
    postsContainer.appendChild(div);
  });
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
categorySelect.addEventListener("change", e => {
  currentCategory = e.target.value; currentPage = 1; renderPosts();
});
searchInput.addEventListener("input", e => {
  currentSearchTerm = e.target.value.trim(); currentPage = 1; renderPosts();
});
prevBtn.addEventListener("click", () => {if(currentPage>1){ currentPage--; renderPosts();}});
nextBtn.addEventListener("click", () => {
  const total = Math.ceil(filterPosts().length / postsPerPage);
  if(currentPage<total){currentPage++; renderPosts();}
});
window.addEventListener("DOMContentLoaded",renderPosts);
