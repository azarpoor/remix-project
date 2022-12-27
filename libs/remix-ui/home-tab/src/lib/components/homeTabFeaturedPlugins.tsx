/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import PluginButton from './pluginButton'
import { ThemeContext } from '../themeContext'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CustomNavButtons from './customNavButtons'
const itemsToShow = 5
declare global {
  interface Window {
    _paq: any
  }
}
const _paq = window._paq = window._paq || [] //eslint-disable-line
interface  HomeTabFeaturedPluginsProps {
  plugin: any
}

function HomeTabFeaturedPlugins ({plugin}: HomeTabFeaturedPluginsProps) {

  const themeFilter = useContext(ThemeContext)
  const carouselRef = useRef<any>({})
  const carouselRefDiv = useRef(null)
  const intl = useIntl()

  useEffect(() => {
    document.addEventListener("wheel", handleScroll)
    return () => {
      document.removeEventListener("wheel", handleScroll)
    }
  }, [])

  function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  const handleScroll = (e) => {
    if (isDescendant(carouselRefDiv.current, e.target)) {
      e.stopPropagation()
      let nextSlide = 0
      if (e.wheelDelta < 0) {
        nextSlide = carouselRef.current.state.currentSlide + 1;
        if (Math.abs(carouselRef.current.state.transform) >= carouselRef.current.containerRef.current.scrollWidth - carouselRef.current.state.containerWidth) return
        carouselRef.current.goToSlide(nextSlide)
      } else {
        nextSlide = carouselRef.current.state.currentSlide - 1;
        if (nextSlide < 0) nextSlide = 0
        carouselRef.current.goToSlide(nextSlide)
      }
    }
  }

  const startSolidity = async () => {
    await plugin.appManager.activatePlugin(['solidity', 'udapp', 'solidityStaticAnalysis', 'solidityUnitTesting'])
    plugin.verticalIcons.select('solidity')
    _paq.push(['trackEvent', 'hometabActivate', 'userActivate', 'solidity'])
  }
  const startStarkNet = async () => {
    await plugin.appManager.activatePlugin('starkNet_compiler')
    plugin.verticalIcons.select('starkNet_compiler')
    _paq.push(['trackEvent', 'hometabActivate', 'userActivate', 'starkNet_compiler'])
  }
  const startSolhint = async () => {
    await plugin.appManager.activatePlugin(['solidity', 'solhint'])
    plugin.verticalIcons.select('solhint')
    _paq.push(['trackEvent', 'hometabActivate', 'userActivate', 'solhint'])
  }
  const startSourceVerify = async () => {
    await plugin.appManager.activatePlugin(['solidity', 'sourcify'])
    plugin.verticalIcons.select('sourcify')
    _paq.push(['trackEvent', 'hometabActivate', 'userActivate', 'sourcify'])
  }
  const startSolidityUnitTesting = async () => {
    await plugin.appManager.activatePlugin(['solidity', 'solidityUnitTesting'])
    plugin.verticalIcons.select('solidityUnitTesting')
    _paq.push(['trackEvent', 'hometabActivate', 'userActivate', 'solidityUnitTesting'])
  }

  const startDgit = async () => {
    await plugin.appManager.activatePlugin('dgit')
    plugin.verticalIcons.select('dgit')
    _paq.push(['tracEvent', 'hometabActivate', 'userActivate', 'dgit'])
  }

  return (
    <div className="pl-2 w-100" id="hTFeaturedPlugins">
      <label className="" style={{fontSize: "1.2rem"}}><FormattedMessage id='home.featuredPlugins' /></label>
      <div ref={carouselRefDiv} className="w-100 d-flex flex-column">
        <ThemeContext.Provider value={ themeFilter }>
          <Carousel
            ref={carouselRef}
            focusOnSelect={true}
            customButtonGroup={
              <CustomNavButtons next={undefined} previous={undefined} goToSlide={undefined} parent={carouselRef} />
            }
            arrows={false}
            swipeable={false}
            draggable={true}
            showDots={false}
            responsive={
              {
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: itemsToShow
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: itemsToShow
                }
              }
            }
            renderButtonGroupOutside={true}
            ssr={true} // means to render carousel on server-side.
            keyBoardControl={true}
            containerClass="carousel-container"
            deviceType={"desktop"}
            itemClass="w-100"
          >
            <PluginButton
              imgPath="assets/img/solidityLogo.webp"
              envID="solidityLogo"
              envText="Solidity"
              description={intl.formatMessage({ id: 'home.solidityPluginDesc' })}
              remixMaintained={true}
              callback={() => startSolidity()}
            />
            <PluginButton
              imgPath="assets/img/solhintLogo.webp"
              envID="solhintLogo" envText="Solhint linter"
              description={intl.formatMessage({ id: 'home.solhintPluginDesc' })}
              callback={() => startSolhint()}
            />
            <PluginButton
              imgPath="assets/img/git.webp"
              envID="dgitLogo"
              envText="Dgit"
              description={intl.formatMessage({ id: 'home.dgitPluginDesc' })}
              callback={() => startDgit()}
            />
            <PluginButton
              imgPath="assets/img/sourcifyNewLogo.webp"
              envID="sourcifyLogo"
              envText="Sourcify"
              description={intl.formatMessage({ id: 'home.sourcifyPluginDesc' })}
              callback={() => startSourceVerify()}
            />
            <PluginButton
              imgPath="assets/img/starkNetLogo.webp"
              envID="starkNetLogo"
              envText="StarkNet"
              description={intl.formatMessage({ id: 'home.starkNetPluginDesc' })}
              l2={true}
              callback={() => startStarkNet()}
            />
            <PluginButton
              imgPath="assets/img/unitTesting.webp"
              envID="sUTLogo"
              envText="Solidity unit testing"
              description={intl.formatMessage({ id: 'home.unitTestPluginDesc' })}
              callback={() => startSolidityUnitTesting()}
            />
          </Carousel>
        </ThemeContext.Provider>
      </div>
    </div>
  )
}

export default HomeTabFeaturedPlugins
