<template>
  <nav>
    <div class="menu">
      <p class="website-name">LOGO</p>
      <div class="menu-links">
        <a href="" class="link">about</a>
        <a href="" class="link">projects</a>
        <a href="" class="link">contacts</a>
      </div>
      <div class="menu-icon">
        <span class="icon"></span>
      </div>
    </div>
  </nav>

  <section class="wrapper">
    <div class="container">
      <div id="scene" class="scene" data-hover-only="false">
        <div class="circle" data-depth="1.2"></div>

        <div class="one" data-depth="0.9">
          <div class="content">
            <span class="piece"></span>
            <span class="piece"></span>
            <span class="piece"></span>
          </div>
        </div>

        <div class="two" data-depth="0.60">
          <div class="content">
            <span class="piece"></span>
            <span class="piece"></span>
            <span class="piece"></span>
          </div>
        </div>

        <div class="three" data-depth="0.40">
          <div class="content">
            <span class="piece"></span>
            <span class="piece"></span>
            <span class="piece"></span>
          </div>
        </div>

        <p class="p404" data-depth="0.50">404</p>
        <p class="p404" data-depth="0.10">404</p>
      </div>

      <div class="text">
        <article>
          <p>哦！看起来您迷路了<br />试着点一下</p>
          <button @click="$router.replace('/home')">我 敢!</button>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  $cubic: cubic-bezier(0.64, 0.01, 0.07, 1.65);
  $transition: 0.6s $cubic;
  $size: 40px;

  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: $size;
  height: $size;
  transition: all 0.2s ease;

  .bg-links {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $size;
    height: $size;
    background-color: rgba(#000, 0.2);
    border-radius: 100%;
    backdrop-filter: blur(5px);
  }

  .logo {
    right: 0;
    bottom: 0;
    z-index: 9;
    width: $size;
    height: $size;
    background-position: 10px 7px;
    background-repeat: no-repeat;
    background-size: 50%;
    opacity: 0.9;
    transition: all 1s 0.2s ease;
  }

  .social {
    right: 0;
    bottom: 0;
    opacity: 0;

    .icon {
      display: flex;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px;
      background-color: transparent;
      border-radius: 100%;
      opacity: 0;
      transition: all 0.2s ease, background-color 0.4s ease;
    }

    &.portfolio {
      transition: all 0.8s ease;
    }

    &.dribbble {
      transition: all 0.3s ease;
    }

    &.linkedin {
      transition: all 0.8s ease;
    }
  }

  &:hover {
    width: 105px;
    height: 105px;
    transition: all $transition;

    .logo {
      opacity: 1;
      transition: all 0.6s ease;
    }

    .social {
      opacity: 1;

      .icon {
        opacity: 0.9;
      }

      &:hover {
        background-size: 28px;

        .icon {
          background-size: 65%;
          opacity: 1;
        }
      }

      &.portfolio {
        right: 0;
        bottom: calc(100% - 40px);
        transition: all 0.3s 0s $cubic;

        .icon {
          &:hover {
            background-color: #698fb7;
          }
        }
      }

      &.dribbble {
        right: 45%;
        bottom: 45%;
        transition: all 0.3s 0.15s $cubic;

        .icon {
          &:hover {
            background-color: #ea4c89;
          }
        }
      }

      &.linkedin {
        right: calc(100% - 40px);
        bottom: 0;
        transition: all 0.3s 0.25s $cubic;

        .icon {
          &:hover {
            background-color: #0077b5;
          }
        }
      }
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

$font-01: "Barlow", sans-serif;
$font-02: "Barlow Condensed", sans-serif;

$m-01: #fb8a8a;
$m-02: #ffedc0;

$bg-01: #695681;
$bg-02: #36184f;
$bg-03: #32243e;

$g-01: linear-gradient(90deg, #ffedc0 0%, #ff9d87 100%);
$g-02: linear-gradient(90deg, #8077ea 13.7%, #eb73ff 94.65%);

$cubic: cubic-bezier(0.4, 0.35, 0, 1.53);
$cubic2: cubic-bezier(0.18, 0.89, 0.32, 1.15);

// $circleShadow: inset 5px 20px 40px rgba($bg-02, 0.25),
//   inset 5px 0 5px rgba($bg-03, 0.3), inset 5px 5px 20px rgba($bg-03, 0.25),
//   2px 2px 5px rgba(white 0.2);

@mixin sm {
  @media screen and (width <= 799px) {
    @content;
  }
}

@mixin height {
  @media screen and (height <= 660px) {
    @content;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
button,
a,
i,
input,
body {
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;
  border: 0;
  list-style: none;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: 0;
  }
}

body {
  padding: 0;
  margin: 0;
  height: auto;
  font-family: $font-01;
  background: $bg-01;
}

.logo {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgb(0 0 0 / 10%);
  border-radius: 100%;
  backdrop-filter: blur(5px);

  img {
    width: 55%;
    height: 55%;
    transform: translateY(-1px);
    opacity: 0.8;
  }
}

nav {
  .menu {
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    width: 100%;
    height: 80px;
    box-sizing: border-box;

    .website-name {
      padding: 4px 8px;
      font-size: 20px;
      color: $bg-01;
      background: white;
      border-radius: 2px;
      opacity: 0.5;
      transition: all 0.4s ease;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }

    .menu-links {
      opacity: 0.5;
      transition: all 0.4s ease;

      &:hover {
        opacity: 1;
      }

      @include sm {
        display: none;
      }

      .link {
        position: relative;
        margin-right: 50px;
        color: white;
        transition: all 0.3s 0.2s ease;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 2px;

        &:last-child {
          margin-right: 0;
        }

        &::before {
          position: absolute;
          bottom: -10px;
          left: 100%;
          width: 0;
          height: 4px;
          background: $g-01;
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
          content: "";
        }

        &:hover {
          color: $m-01;
          opacity: 1;

          &::before {
            left: 0;
            width: 40px;
          }
        }
      }
    }

    .menu-icon {
      position: relative;
      display: none;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      cursor: pointer;

      @include sm {
        display: flex;
      }

      .icon {
        position: absolute;
        width: 24px;
        height: 2px;
        background: white;

        &::before,
        &::after {
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          transition: all 0.3s cubic-bezier(0.49, 0.04, 0, 1.55);
          content: "";
        }

        &::before {
          transform: translateY(-8px);
        }

        &::after {
          transform: translateY(8px);
        }
      }

      &:hover {
        .icon {
          background: $m-02;

          &::before {
            transform: translateY(-10px);
          }

          &::after {
            transform: translateY(10px);
          }
        }
      }
    }
  }
}

.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100vh;
  background-color: $bg-01;
  grid-template-columns: 1fr;

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    transition: all 0.4s ease;

    // Scene for the Parallax Effect
    .scene {
      position: absolute;
      width: 100vw;
      height: 100vh;
      vertical-align: middle;
    }

    // All elements' containers
    .one,
    .two,
    .three,
    .circle,
    .p404 {
      top: 20% !important;
      left: 20% !important;
      width: 60%;
      min-width: 400px;
      height: 60%;
      min-height: 400px;

      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 600px;
        height: 600px;
        transform: translate(-50%, -50%);
        animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

        @keyframes content {
          0% {
            width: 0;
          }
        }

        // Pieces
        .piece {
          position: absolute;
          z-index: 1;
          display: flex;
          width: 200px;
          height: 80px;
          border-radius: 80px;
          animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;

          @keyframes pieceLeft {
            0% {
            }

            50% {
              left: 80%;
              width: 10%;
            }

            100% {
            }
          }

          @keyframes pieceRight {
            0% {
            }

            50% {
              right: 80%;
              width: 10%;
            }

            100% {
            }
          }
        }
      }

      @include sm {
        top: 5% !important;
        left: 5% !important;
        width: 90%;
        min-width: 280px;
        height: 90%;
        min-height: 280px;
      }

      @include height {
        top: 20% !important;
        left: 20% !important;
        width: 60%;
        min-width: 280px;
        height: 60%;
        min-height: 280px;
      }
    }

    // Text and Button container
    .text {
      position: absolute;
      margin: 40px 0;
      width: 60%;
      min-width: 400px;
      height: 40%;
      min-height: 500px;
      animation: text 0.6s 1.8s ease backwards;

      @keyframes text {
        0% {
          opacity: 0;
          transform: translateY(40px);
        }
      }

      @include sm {
        height: 80%;
        min-height: 400px;
      }

      article {
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        text-align: center;
        flex-direction: column;
        transform: translateX(-50%);

        @include sm {
          width: 100%;
        }

        p {
          margin-bottom: 40px;
          font-size: 18px;
          color: white;
          text-shadow: 6px 6px 10px $bg-03;
          letter-spacing: 0.6px;
        }

        button {
          z-index: 3;
          padding: 0 30px;
          height: 40px;
          font-size: 12px;
          color: $bg-01;
          background-color: white;
          border-radius: 50px;
          box-shadow: 0 15px 20px rgba($bg-02, 0.5);
          transition: all 0.3s ease;
          cursor: pointer;
          text-transform: uppercase;
          font-weight: 600;

          &:hover {
            color: white;
            background: $m-01;
            box-shadow: 0 10px 10px -10px rgba($bg-02, 0.5);
            transform: translateY(5px);
          }
        }
      }
    }

    // The 404 Number
    .p404 {
      position: absolute;
      z-index: 2;
      display: flex !important;
      justify-content: center;
      align-items: center;
      font-size: 200px;
      color: white;
      font-weight: 700;
      letter-spacing: 4px;
      animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
      animation-delay: 1.2s;

      @include sm {
        font-size: 100px;
      }

      @keyframes anime404 {
        0% {
          opacity: 0;
          transform: scale(10) skew(20deg, 20deg);
        }
      }

      &:nth-of-type(2) {
        z-index: 1;
        color: $bg-02;
        opacity: 0.8;
        filter: blur(10px);
        animation-delay: 1s;
      }
    }

    // Bigger Circle
    .circle {
      position: absolute;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 41%;
        height: 82%;
        background-color: rgba($bg-02, 0.2);
        border-radius: 100%;
        // box-shadow: $circleShadow;
        content: "";
        transform: translate(-50%, -50%);
        animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

        @keyframes circle {
          0% {
            width: 0;
            height: 0;
          }
        }

        @include sm {
          width: 400px;
          height: 400px;
        }
      }
    }

    // Container 1
    .one {
      .content {
        // Smaller Circle
        &::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          background-color: rgba($bg-02, 0.3);
          border-radius: 100%;
          // box-shadow: $circleShadow;
          animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;

          @include sm {
            width: 300px;
            height: 300px;
          }
        }

        .piece {
          background: $g-02;

          &:nth-child(1) {
            top: 18%;
            right: 15%;
            width: 120px;
            height: 30px;
            animation-delay: 0.5s;
            animation-name: pieceRight;
          }

          &:nth-child(2) {
            top: 45%;
            left: 15%;
            width: 150px;
            height: 50px;
            animation-delay: 1s;
            animation-name: pieceLeft;
          }

          &:nth-child(3) {
            top: 75%;
            left: 10%;
            width: 70px;
            height: 20px;
            animation-delay: 1.5s;
            animation-name: pieceLeft;
          }
        }
      }
    }

    // Container 2
    .two {
      .content {
        .piece {
          background: $g-01;

          &:nth-child(1) {
            top: 25%;
            left: 0%;
            width: 120px;
            height: 40px;
            animation-delay: 2s;
            animation-name: pieceLeft;
          }

          &:nth-child(2) {
            top: 35%;
            right: 15%;
            width: 180px;
            height: 50px;
            animation-delay: 2.5s;
            animation-name: pieceRight;
          }

          &:nth-child(3) {
            top: 80%;
            right: 10%;
            width: 160px;
            height: 20px;
            animation-delay: 3s;
            animation-name: pieceRight;
          }
        }
      }
    }

    // Container 3
    .three {
      .content {
        .piece {
          background: $m-01;

          &:nth-child(1) {
            top: 35%;
            left: 25%;
            width: 80px;
            height: 20px;
            animation-name: pieceLeft;
            animation-delay: 3.5s;
          }

          &:nth-child(2) {
            top: 55%;
            right: 10%;
            width: 140px;
            height: 40px;
            animation-name: pieceRight;
            animation-delay: 4s;
          }

          &:nth-child(3) {
            top: 68%;
            left: 40%;
            width: 80px;
            height: 20px;
            animation-name: pieceLeft;
            animation-delay: 4.5s;
          }
        }
      }
    }
  }
}
</style>
