<template>
  <header
    class="head nav d-flex jc-around ai-center"
    :class="isScrolling ? `mini` : ''"
  >
    <div class="d-flex text-white hand">
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-5 icon"
      >
        {{ item.text }}
      </router-link>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link tag="div" to="/">Home</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/archives">File</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/tags">Label</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/message">Message</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/about">About</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import Search from '../components/Search.vue'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Search,
  },
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      isScrolling: false,
      items: [
        { text: 'Home', link: '/' },
        { text: 'File', link: '/archives' },
        { text: 'Label', link: '/tags' },
        { text: 'About', link: '/about' },
      ],
    }
  },
  mounted() {
    this.ajustNavigation()
    window.addEventListener('scroll', this.ajustNavigation)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.ajustNavigation)
  },
  methods: {
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      this.isScrolling = scrollTop > 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.nav-item.active {
  color: map-get($colors, 'red');
}

.nav-item:hover {
  color: map-get($colors, 'red');
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: relative;
  height: 65px;
  background-color: transparent;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
  .icon-music-o {
    font-size: 19px;
  }
  .icon-Pause1 {
    font-size: 19px;
  }
}

.mini {
  background-color: map-get($colors, 'navcolor');
  height: 56px;
  transition: 0.5s ease-in-out;
}
.show-list {
  display: block !important;
}
.menu-button {
  border: none;
  display: none;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.isShowMenu {
  i {
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .play {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
  }
}
</style>
