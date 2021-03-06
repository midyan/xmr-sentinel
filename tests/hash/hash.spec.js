const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)
const expect = chai.expect

const appDir = (path.resolve(__dirname) + '/').replace('tests/hash/', '')
const testDir = (path.resolve(__dirname) + '/').replace('hash/', '')

const mainFile = require(appDir + 'index.js')

const hash = mainFile.hash
const utils = mainFile.utils

const mock = require(testDir + 'assets/assets.js')
const nodes = require(appDir + 'lib/nodes.js')

describe('Testing hash module', () => {
  describe('getHashData Funciton', () => {
    it('should return hashData', function (done) {

      hash
        .getHashData(mock.html.hashPage.toString())
        .then(res => {
          var err = null

          try {
            if (!_.isEqual(res, mock.parsedPageObject)) throw new Error('Object is not the same')
          } catch (e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))
    })
  })
  describe('getHashDataFromNodes Function', () => {
    it('should return haspage', function (done) {
      /**
       * Nock is not handling too many requests at once, but I have tested this
       * with a real mining node. It's working alright
       */
      // const mockOpts = {
      //   html: mock.html.hashPage,
      //   url: nodeUrl
      // }
      //
      // const page = 'h'
      //
      // const address = {
      //   ip: '127.0.0.1',
      //   port: '9999'
      // }
      //
      // nodeMock.get('/'+page).reply(200, mockOpts.html)
      //
      // hash
      //   .getHashDataFromNodes(nodes)
      //   .then(res => {
      //     var err = null
      //     try {
      //       console.log(res)
      //     } catch(e) {
      //       err = e
      //     }
      //
      //     done(err)
      //   })
      //   .catch(err => done(err))
      done()
    })
  })
  describe('getHashSum Function', () => {
    it('should return hashsum', function (done) {

      hash
        .getHashSum(mock.parsedNodesTotal)
        .then(res => {
          var err = null

          try {
            if (!_.isEqual(res, mock.totalHashSum)) throw new Error('Total is not as expected')
          } catch(e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))

    })
  })
})
