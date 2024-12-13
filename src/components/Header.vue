<template>
  <header>
    <nav>
        <div class="logo">
            <router-link to="/">
                <img src="@/assets/img/logo.png" alt="">
                <h4>CodedUp</h4>
            </router-link>
        </div>
        <ul>
            <li><router-link to="/contato">Contato</router-link></li>
            <li><router-link to="/cursos">Cursos</router-link></li>
        </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
header {
    height: var(--header-height);
    background-color: var(--black-color);
    padding: 10px 20px;
    display: flex;
    nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            a {
                display: flex;
                align-items: center;
                img {
                    width: 30px;
                    height: 30px;
                }
                h4 {
                    color: var(--white-color);
                    margin-left: 10px;
                }
            }
        }
        ul {
            display: flex;
            li {
                margin-left: 20px;
                a {
                    color: var(--white-color);
                    text-decoration: none;
                    &:hover {
                        color: var(--primary-color);
                    }
                    &.router-link-exact-active {
                        color: var(--highlight-color);
                    }
                }
            }
        }
    }
}

</style>