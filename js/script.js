// Data Posts User
let postsData = [
  {
    profileImg: './6.jpg',
    name: 'Aya',
    postImg: './1.jpg',
    react: {
      like: 20,
      comment: 22,
    },
    data: 30,
    caption: 'my life',
  },
  {
    profileImg: './6.jpg',
    name: 'amr',
    postImg: './6.jpg',
    react: {
      like: 50,
      comment: 81,
    },
    data: 5,
    caption: 'thanks God',
  },
  {
    profileImg: './6.jpg',
    name: 'islam',
    postImg: './5.jpg',
    react: {
      like: 590,
      comment: 81,
    },
    data: 9,
    caption: 'yallah ',
  },
  {
    profileImg: './6.jpg',
    name: 'mohamed salah',
    postImg: './7.jpg',
    react: {
      like: 590,
      comment: 81,
    },
    data: 25,
    caption: 'cd mkdir new file this codmmand',
  },
  {
    profileImg: './6.jpg',
    name: 'Abdullah',
    postImg: './4.jpg',
    react: {
      like: 700,
      comment: 23,
    },
    data: 27,
    caption: 'Full Stack Web Developer 😎❤',
  },
  {
    profileImg: './6.jpg',
    name: 'Italain',
    postImg: './8.jpg',
    react: {
      like: 800,
      comment: 100,
    },
    data: 12,
    caption: 'Hola!',
  },
  {
    profileImg: './6.jpg',
    name: 'adel emam',
    postImg: './7.jpg',
    react: {
      like: 800,
      comment: 100,
    },
    data: 10,
    caption: 'Famous A',
  },
  {
    profileImg: './6.jpg',
    name: 'Magda',
    postImg: './6.jpg',
    react: {
      like: 200,
      comment: 40,
    },
    data: 50,
    caption: 'MCIT #ITI #Training',
  },
];

// localStorage.setItem('postsData', JSON.stringify(postsData));

// Retrieve postsData from localStorage
const storedPostsData = localStorage.getItem('postsData');
const retrievedPostsData = JSON.parse(storedPostsData);
if (retrievedPostsData) {
  postsData = retrievedPostsData;
}
// Elements
const toggleThemeBtn = document.querySelectorAll('.header__theme-button');
const posts = document.querySelectorAll('.post');
const postsContent = document.querySelectorAll('.post__content');
// create post
const imageUpload = document.getElementById('imageUpload');
const selectPopUp = document.getElementById('select-pop-up');
const btnCreatePost = document.querySelectorAll('.createPost');
const parentPosts = document.getElementById('posts');
const btnDone = document.getElementById('done');
const textCaption = document.getElementById('textCaption');
const closebtn = document.getElementById('close');
const boxIMG = document.querySelector('.showphoto');
var t = '';
// boxIMG = "";
displayRandomPosts();
// ===================================
// DARK/LIGHT THEME
// Set initial theme from LocalStorage
document.onload = setInitialTheme(localStorage.getItem('theme'));
function setInitialTheme(themeKey) {
  if (themeKey === 'dark') {
    document.documentElement.classList.add('darkTheme');
  } else {
    document.documentElement.classList.remove('darkTheme');
  }
}

// Toggle theme button
toggleThemeBtn.forEach((itembtn) => {
  itembtn.addEventListener('click', () => {
    // Toggle root class
    document.documentElement.classList.toggle('darkTheme');

    // Saving current theme on LocalStorage
    if (document.documentElement.classList.contains('darkTheme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
// ===================================

posts.forEach((post) => {
  if (post.querySelectorAll('.post__media').length > 1) {
    const leftButtonElement = document.createElement('button');
    leftButtonElement.classList.add('post__left-button');
    leftButtonElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="#fff" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
      </svg>
    `;

    const rightButtonElement = document.createElement('button');
    rightButtonElement.classList.add('post__right-button');
    rightButtonElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="#fff" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
    </svg>
    `;

    post.querySelector('.post__content').appendChild(leftButtonElement);
    post.querySelector('.post__content').appendChild(rightButtonElement);

    post.querySelectorAll('.post__media').forEach(function () {
      const postMediaIndicatorElement = document.createElement('div');
      postMediaIndicatorElement.classList.add('post__indicator');

      post
        .querySelector('.post__indicators')
        .appendChild(postMediaIndicatorElement);
    });

    // Observer to change the actual media indicator
    const postMediasContainer = post.querySelector('.post__medias');
    const postMediaIndicators = post.querySelectorAll('.post__indicator');
    const postIndicatorObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Removing all the indicators
            postMediaIndicators.forEach((indicator) =>
              indicator.classList.remove('post__indicator--active')
            );
            // Adding the indicator that matches the current post media
            postMediaIndicators[
              Array.from(postMedias).indexOf(entry.target)
            ].classList.add('post__indicator--active');
          }
        });
      },
      { root: postMediasContainer, threshold: 0.5 }
    );

    // Calling the observer for every post media
    const postMedias = post.querySelectorAll('.post__media');
    postMedias.forEach((media) => {
      postIndicatorObserver.observe(media);
    });
  }
});

// Adding buttons features on every post with multiple medias
postsContent.forEach((post) => {
  if (post.querySelectorAll('.post__media').length > 1) {
    const leftButton = post.querySelector('.post__left-button');
    const rightButton = post.querySelector('.post__right-button');
    const postMediasContainer = post.querySelector('.post__medias');

    // Functions for left and right buttons
    leftButton.addEventListener('click', () => {
      postMediasContainer.scrollLeft -= 400;
    });
    rightButton.addEventListener('click', () => {
      postMediasContainer.scrollLeft += 400;
    });

    // Observer to hide button if necessary
    const postButtonObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.target === post.querySelector('.post__media:first-child')) {
            leftButton.style.display = entry.isIntersecting ? 'none' : 'unset';
          } else if (
            entry.target === post.querySelector('.post__media:last-child')
          ) {
            rightButton.style.display = entry.isIntersecting ? 'none' : 'unset';
          }
        });
      },
      { root: postMediasContainer, threshold: 0.5 }
    );

    if (window.matchMedia('(min-width: 1024px)').matches) {
      postButtonObserver.observe(
        post.querySelector('.post__media:first-child')
      );
      postButtonObserver.observe(post.querySelector('.post__media:last-child'));
    }
  }
});

var arr = ['essam', 'abdallah', 'sara', 'amr'];

var counter = 0;
let userNameFromLocal = localStorage.getItem('userName');
console.log('username from local', userNameFromLocal);
const showUserName = document.getElementById('username-profile');
showUserName.innerHTML = userNameFromLocal;
function handlePosts(srcc, caption) {
  let index = Math.floor(Math.random() * 4);
  var referenceElement = parentPosts.querySelector('.post');
  var newElement = document.createElement('div');
  newElement.setAttribute('class', 'post');
  like = 0;
  postsData = [
    {
      profileImg: `${srcc}`,
      name: `User ${counter}`,
      postImg: `${srcc}`,
      react: {
        like: 0,
        comment: 0,
      },
      data: `10 / 10 / 2023`,
      caption: `${caption}`,
    },
    ...postsData,
  ];
  newElement.innerHTML = ` <article class="post">
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/MohamedEssamEllithy"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="assets/default-user.png" alt="User Picture" />
                  </a>
                  <a
      href="https://github.com/MohamedEssamEllithy"
      target="_blank"
      class="post__user"
      >${userNameFromLocal}</a
      >
                </div>

                <button class="post__more-options">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.5"
                      cy="11.5"
                      r="1.5"
                      fill="var(--text-dark)"
                    />
                    <circle cx="12" cy="11.5" r="1.5" fill="var(--text-dark)" />
                    <circle
                      cx="17.5"
                      cy="11.5"
                      r="1.5"
                      fill="var(--text-dark)"
                    />
                  </svg>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${srcc}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button likebtn">
                    <i class="fa-regular fa-heart fa-lg like "  style="color: var(--text-dark);"></i>
                  </button>
                  <button class="post__button">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2959 20.8165L20.2351 16.8602C20.1743 16.6385 20.2047 16.3994 20.309 16.1907C21.2351 14.3342 21.5438 12.117 20.9742 9.80402C20.2003 6.67374 17.757 4.16081 14.6354 3.33042C13.7833 3.10869 12.9442 3 12.1312 3C6.29665 3 1.74035 8.47365 3.31418 14.5647C4.04458 17.3819 7.05314 20.2992 9.88344 20.9861C10.6486 21.173 11.4008 21.26 12.1312 21.26C13.7006 21.26 15.1701 20.8557 16.4614 20.1601C16.6049 20.0818 16.7657 20.0383 16.9222 20.0383C17.0005 20.0383 17.0787 20.047 17.157 20.0688L21.009 21.0991C21.0307 21.1035 21.0525 21.1078 21.0699 21.1078C21.2177 21.1078 21.3351 20.9687 21.2959 20.8165ZM19.0178 17.1863L19.6178 19.4253L17.4831 18.8558C17.3005 18.8079 17.1135 18.7819 16.9222 18.7819C16.557 18.7819 16.1875 18.8775 15.8571 19.0558C14.6963 19.6818 13.4441 19.9992 12.1312 19.9992C11.4834 19.9992 10.8269 19.9166 10.1791 19.7601C7.78354 19.1775 5.14453 16.6037 4.53586 14.2473C3.90111 11.7865 4.40109 9.26057 5.90536 7.31719C7.40964 5.3738 9.6791 4.26081 12.1312 4.26081C12.8529 4.26081 13.5876 4.35646 14.3137 4.5521C16.9961 5.26511 19.0786 7.39544 19.7525 10.1084C20.2264 12.0213 20.0308 13.9299 19.183 15.6298C18.9395 16.1168 18.8787 16.6689 19.0178 17.1863Z"
                        fill="var(--text-dark)"
                        stroke="var(--text-dark)"
                        stroke-width="0.7"
                      />
                    </svg>
                  </button>
                  <button class="post__button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.8555 3.44542C22.6978 3.16703 22.3962 3 22.0714 3L2.91369 3.01392C2.52859 3.01392 2.19453 3.25055 2.05997 3.60781C1.96254 3.86764 1.98574 4.14603 2.11565 4.37338C2.16669 4.45689 2.23165 4.53577 2.31052 4.60537L9.69243 10.9712L11.4927 20.5338C11.5623 20.9096 11.8499 21.188 12.2304 21.2483C12.6062 21.3086 12.9774 21.1323 13.1723 20.8029L22.8509 4.35018C23.0179 4.06715 23.0179 3.72381 22.8555 3.44542ZM4.21748 4.39194H19.8164L10.4255 9.75089L4.21748 4.39194ZM12.6248 18.9841L11.1122 10.948L20.5171 5.58436L12.6248 18.9841Z"
                        fill="var(--text-dark)"
                        stroke="var(--text-dark)"
                        stroke-width="0.3"
                      />
                    </svg>
                  </button>

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.875 2H4.125C3.50625 2 3 2.44939 3 3.00481V22.4648C3 23.0202 3.36563 23.1616 3.82125 22.7728L11.5444 16.1986C11.7244 16.0471 12.0225 16.0471 12.2025 16.1936L20.1731 22.7879C20.6287 23.1666 21 23.0202 21 22.4648V3.00481C21 2.44939 20.4994 2 19.875 2ZM19.3125 20.0209L13.3444 15.0827C12.9281 14.7394 12.405 14.5677 11.8763 14.5677C11.3363 14.5677 10.8019 14.7444 10.3856 15.0979L4.6875 19.9502V3.51479H19.3125V20.0209Z"
                        fill="var(--text-dark)"
                        stroke="var(--text-dark)"
                        stroke-width="0.7"
                      />
                    </svg>
                  </button>
                </div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="assets/default-user.png" alt="User Picture" />
                    </a>

                    <span
                      >Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#" id="likesNum">${like}</a></span
                    >
                  </div>

                  <div class="post__description">
                    <span>
                      <a
          class="post__name--underline"
          href="https://github.com/MohamedEssamEllithy"
          target="_blank"
          >${arr[index]}</a
          >
          ${caption}
          </span>
            </div>
            <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
            </article>`;
  srcc = '';
  parentPosts.insertBefore(newElement, referenceElement);
  // displayRandomPosts();
  handleBtnLike();
  // closebtn.click();
  localStorage.setItem('postsData', JSON.stringify(postsData));
}

//***************************************************/
// funtion that get the image file and will pass it to post image fn
function showPostImg() {
  imageUpload.addEventListener('change', function (e) {
    var selectedFile = new FileReader();
    selectedFile.readAsDataURL(imageUpload.files[0]);
    selectedFile.onload = function () {
      t = selectedFile.result;
      btnDone.disabled = false;
      document.getElementById('mmm').innerHTML = `<img src="${t}" alt="">`;
    };
  });
}

// funtion of post image btn
btnDone.addEventListener('click', () => {
  if (t === '' && textCaption.value) {
    alert('Your src Empty !');
  } else {
    const Caption = textCaption.value;
    handlePosts(t, Caption);
    textCaption.value = '';
    closebtn.click();
    t = '';
    document.getElementById('mmm').innerHTML = ``;
  }
  btnDone.disabled = true;
  imageUpload.value = '';
});

// function of close btn
closebtn.addEventListener('click', () => {
  textCaption.value = '';
});
btnDone.disabled = true;

// function of creat post btn
btnCreatePost.forEach((creat) => {
  creat.addEventListener('click', () => {
    // console.log('T Before enter function', t);
    showPostImg();
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayRandomPosts() {
  const numberOfPostsToDisplay = postsData.length;
  const likeButtons = document.querySelectorAll('.likebtn'); // Declare the likeButtons variable
  // Change this to the number of random posts you want to display.
  const randomPostsIndices = [];
  var arr = ['essam', 'abdallah', 'sara', 'amr']; //aproved
  while (randomPostsIndices.length < numberOfPostsToDisplay) {
    const randomIndex = getRandomInt(postsData.length);
    if (!randomPostsIndices.includes(randomIndex)) {
      randomPostsIndices.push(randomIndex);
    }
  }

  parentPosts.innerHTML = '';

  randomPostsIndices.forEach((randomIndex) => {
    let index = Math.floor(Math.random() * 4);
    const {
      profileImg,
      name,
      postImg,
      data,
      react: { like, comment },
      caption,
    } = postsData[randomIndex];

    const postHTML = ` <article class="post">
    <div class="post__header">
      <div class="post__profile">
        <a
          href="https://github.com/MohamedEssamEllithy"
          target="_blank"
          class="post__avatar"
        >
          <img src="${postImg}" alt="User Picture" />
        </a>
        <a
href="https://github.com/MohamedEssamEllithy"
target="_blank"
class="post__user"
>${name}</a
>
      </div>

      <button class="post__more-options">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="6.5"
            cy="11.5"
            r="1.5"
            fill="var(--text-dark)"
          />
          <circle cx="12" cy="11.5" r="1.5" fill="var(--text-dark)" />
          <circle
            cx="17.5"
            cy="11.5"
            r="1.5"
            fill="var(--text-dark)"
          />
        </svg>
      </button>
    </div>

    <div class="post__content">
      <div class="post__medias">
        <img
          class="post__media"
          src="${postImg}"
          alt="Post Content"
        />
      </div>
    </div>

    <div class="post__footer">
      <div class="post__buttons">
        <button class="post__button likebtn">
          <i class="fa-regular fa-heart fa-lg like "  style="color: var(--text-dark);"></i>
        </button>
        <button class="post__button">
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.2959 20.8165L20.2351 16.8602C20.1743 16.6385 20.2047 16.3994 20.309 16.1907C21.2351 14.3342 21.5438 12.117 20.9742 9.80402C20.2003 6.67374 17.757 4.16081 14.6354 3.33042C13.7833 3.10869 12.9442 3 12.1312 3C6.29665 3 1.74035 8.47365 3.31418 14.5647C4.04458 17.3819 7.05314 20.2992 9.88344 20.9861C10.6486 21.173 11.4008 21.26 12.1312 21.26C13.7006 21.26 15.1701 20.8557 16.4614 20.1601C16.6049 20.0818 16.7657 20.0383 16.9222 20.0383C17.0005 20.0383 17.0787 20.047 17.157 20.0688L21.009 21.0991C21.0307 21.1035 21.0525 21.1078 21.0699 21.1078C21.2177 21.1078 21.3351 20.9687 21.2959 20.8165ZM19.0178 17.1863L19.6178 19.4253L17.4831 18.8558C17.3005 18.8079 17.1135 18.7819 16.9222 18.7819C16.557 18.7819 16.1875 18.8775 15.8571 19.0558C14.6963 19.6818 13.4441 19.9992 12.1312 19.9992C11.4834 19.9992 10.8269 19.9166 10.1791 19.7601C7.78354 19.1775 5.14453 16.6037 4.53586 14.2473C3.90111 11.7865 4.40109 9.26057 5.90536 7.31719C7.40964 5.3738 9.6791 4.26081 12.1312 4.26081C12.8529 4.26081 13.5876 4.35646 14.3137 4.5521C16.9961 5.26511 19.0786 7.39544 19.7525 10.1084C20.2264 12.0213 20.0308 13.9299 19.183 15.6298C18.9395 16.1168 18.8787 16.6689 19.0178 17.1863Z"
              fill="var(--text-dark)"
              stroke="var(--text-dark)"
              stroke-width="0.7"
            />
          </svg>
        </button>
        <button class="post__button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.8555 3.44542C22.6978 3.16703 22.3962 3 22.0714 3L2.91369 3.01392C2.52859 3.01392 2.19453 3.25055 2.05997 3.60781C1.96254 3.86764 1.98574 4.14603 2.11565 4.37338C2.16669 4.45689 2.23165 4.53577 2.31052 4.60537L9.69243 10.9712L11.4927 20.5338C11.5623 20.9096 11.8499 21.188 12.2304 21.2483C12.6062 21.3086 12.9774 21.1323 13.1723 20.8029L22.8509 4.35018C23.0179 4.06715 23.0179 3.72381 22.8555 3.44542ZM4.21748 4.39194H19.8164L10.4255 9.75089L4.21748 4.39194ZM12.6248 18.9841L11.1122 10.948L20.5171 5.58436L12.6248 18.9841Z"
              fill="var(--text-dark)"
              stroke="var(--text-dark)"
              stroke-width="0.3"
            />
          </svg>
        </button>

        <div class="post__indicators"></div>

        <button class="post__button post__button--align-right">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.875 2H4.125C3.50625 2 3 2.44939 3 3.00481V22.4648C3 23.0202 3.36563 23.1616 3.82125 22.7728L11.5444 16.1986C11.7244 16.0471 12.0225 16.0471 12.2025 16.1936L20.1731 22.7879C20.6287 23.1666 21 23.0202 21 22.4648V3.00481C21 2.44939 20.4994 2 19.875 2ZM19.3125 20.0209L13.3444 15.0827C12.9281 14.7394 12.405 14.5677 11.8763 14.5677C11.3363 14.5677 10.8019 14.7444 10.3856 15.0979L4.6875 19.9502V3.51479H19.3125V20.0209Z"
              fill="var(--text-dark)"
              stroke="var(--text-dark)"
              stroke-width="0.7"
            />
          </svg>
        </button>
      </div>

      <div class="post__infos">
        <div class="post__likes">
          <a href="#" class="post__likes-avatar">
            <img src="assets/default-user.png" alt="User Picture" />
          </a>

          <span
            >Liked by
            <a class="post__name--underline" href="#">${arr[index]}</a> and
            <a href="#" id="likesNum">${like}</a></span
          >
        </div>

        <div class="post__description">
          <span>
            <a
class="post__name--underline"
href="https://github.com/MohamedEssamEllithy"
target="_blank"
>${arr[index]}</a
>
${caption}
</span>
  </div>
  <span class="post__date-time">${data} minutes ago</span>
      </div>
    </div>
  </article>`;

    parentPosts.innerHTML += postHTML;
  });
  handleBtnLike(likeButtons); // Call handleBtnLike and pass the likeButtons array
}
function handleBtnLike() {
  const likebtn = document.querySelectorAll('.likebtn');

  likebtn.forEach((likebutton) => {
    const likeIcon = likebutton.querySelector('.like');
    const likeNum =
      likebutton.parentElement.nextElementSibling.querySelector('#likesNum');
    let flag = likeIcon.classList.contains('fa-regular');
    let currentLikes = parseInt(likeNum.textContent);

    likebutton.addEventListener('click', () => {
      if (flag) {
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
        likeIcon.style.color = '#f10410';
        currentLikes++;
        likeNum.textContent = currentLikes;
        flag = false;
      } else {
        likeIcon.classList.remove('fa-solid');
        likeIcon.classList.add('fa-regular');
        likeIcon.style.color = 'var(--text-dark)';
        currentLikes--;
        likeNum.textContent = currentLikes;
        flag = true;
      }
    });
  });
}

let randomNum = Math.floor(Math.random() * 1000 + 1);

const likedPosts = new Set();

function handleLikeButtonClick(event) {
  const likeButton = event.target;
  const post = likeButton.closest('.post');

  if (!likedPosts.has(post)) {
    const likeCount = parseInt(
      likeButton.textContent.split(' ')[1].slice(1, -1)
    );
    likeButton.textContent = `Liked (${likeCount + 1})`;
    likedPosts.add(post);
  } else {
    const likeCount = parseInt(
      likeButton.textContent.split(' ')[1].slice(1, -1)
    );
    likeButton.textContent = `Like (${likeCount - 1})`;
    likedPosts.delete(post);
  }
}
