import React from 'react'
import Counter from '../../components/Counter'
import SearchForm from '../../components/SearchForm/SearchForm'
import ThemeToggle from '../../components/ThemeToggle'
import homeStyle from './home.module.scss'

function Home() {
  return (
    <div className={homeStyle.home}>
      <Counter />
      <form>
        <div className={homeStyle['theme-toggle']}>
          <ThemeToggle />
        </div>
        <div className={homeStyle['search-form']}>
          <SearchForm />
        </div>
      </form>
    </div>
  )
}

export default Home