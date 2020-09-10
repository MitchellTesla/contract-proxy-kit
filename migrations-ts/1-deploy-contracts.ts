module.exports = function (deployer: Truffle.Deployer, network: string) {
  const deploy = (name: any): Truffle.Deployer => deployer.deploy(artifacts.require(name))

  deploy('CPKFactory')

  if (network === 'test' || network === 'local') {
    ;[
      'GnosisSafe',
      'GnosisSafeProxyFactory',
      'MultiSend',
      'DefaultCallbackHandler',
      'Multistep',
      'DailyLimitModule',
      'ERC20Mintable',
      'ConditionalTokens'
    ].forEach(deploy)
  }

  deployer.deploy(
    artifacts.require('CPKFactoryFacade'),
    artifacts.require('CPKFactory').address,
    artifacts.require('GnosisSafe').address,
    web3.utils.keccak256(web3.utils.utf8ToHex('Contract Proxy Kit')),
    artifacts.require('DefaultCallbackHandler').address,
  );
} as Truffle.Migration;

export {}
