pragma solidity 0.6.1;

import './ERC734.sol';
import './ERC735.sol';

contract Identity is ERC734, ERC735 {
  uint256 executionNonce;
  struct Execution {
    address to;
    uint256 value;
    bytes data;
    bool approved;
    bool executed;
  }

  mapping (bytes32 => Key) keys;
  mapping (uint256 => bytes32[]) keysByPurpose;
  mapping (uint256 => Execution) executions;
  mapping (bytes32 => Claim) claims;
  mapping (uint256 => bytes32[]) claimsByType;

  event ExecutionFailed(uint256 indexed executionId, address indexed to, uint256 indexed value, bytes data);

  constructor() public {
    bytes32 _key = keccak256(abi.encodePacked(msg.sender));
    keys[_key].key = _key;
    keys[_key].purpose = 1;
    keys[_key].keyType = 1;
    keysByPurpose[1].push(_key);
    emit KeyAdded(_key, keys[_key].purpose, 1);
  }

  function getKey(bytes32 _key) public override view returns(uint256 purpose, uint256 keyType, bytes32 key) {
    return (keys[_key].purpose, keys[_key].keyType, keys[_key].key);
  }

  function keyHasPurpose(bytes32 _key, uint256 _purpose) public override view returns(bool exists) {
    bool isThere;
    if (keys[_key].key == 0) return false;
    isThere = keys[_key].purpose <= _purpose;
    return isThere;
  }

  function getKeysByPurpose(uint256 _purpose) public override view returns(bytes32[] memory _keys) {
    return keysByPurpose[_purpose];
  }

  function addKey(bytes32 _key, uint256 _purpose, uint256 _keyType) public override returns(bool success) {
    require(keys[_key].key != _key, "Key already exists"); // Key should not already exist
    if (msg.sender != address(this)) {
      require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 1), "Sender does not have management key"); // Sender has MANAGEMENT_KEY
    }

    keys[_key].key = _key;
    keys[_key].purpose = _purpose;
    keys[_key].keyType = _keyType;

    keysByPurpose[_purpose].push(_key);

    emit KeyAdded(_key, _purpose, _keyType);

    return true;
  }

  function removeKey(bytes32 _key) public override returns(bool success) {
    require(keys[_key].key == _key, "No such key");
    emit KeyRemoved(keys[_key].key, keys[_key].purpose, keys[_key].keyType);

    /* uint index;
    (index,) = keysByPurpose[keys[_key].purpose.indexOf(_key);
    keysByPurpose[keys[_key].purpose.removeByIndex(index); */

    delete keys[_key];

    return true;
  }

  function execute(address _to, uint256 _value, bytes memory _data) public override returns(uint256 executionId) {
    require(!executions[executionNonce].executed, "Already executed");
    executions[executionNonce].to = _to;
    executions[executionNonce].value = _value;
    executions[executionNonce].data = _data;

    emit ExecutionRequested(executionNonce, _to, _value, _data);

    if (keyHasPurpose(keccak256(abi.encodePacked(msg.sender)),1) || keyHasPurpose(keccak256(abi.encodePacked(msg.sender)),2)) {
      approve(executionNonce, true);
    }

    executionNonce++;
    return executionNonce-1;
  }

  function approve(uint256 _id, bool _approve) public override returns(bool success) {
    require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 2), "Sender does not have action key");

    emit Approved(_id, _approve);

    if (_approve == true) {
      executions[_id].approved = true;
      (success,) = executions[_id].to.call.value(executions[_id].value)(executions[_id].data);
      if (success) {
        executions[_id].executed = true;
        emit Executed(
          _id,
          executions[_id].to,
          executions[_id].value,
          executions[_id].data
        );
        return success;
      } else {
        emit ExecutionFailed(
          _id,
          executions[_id].to,
          executions[_id].value,
          executions[_id].data
        );
        return success;
      }
    } else {
      executions[_id].approved = false;
    }
    return true;
  }

  function getClaim(bytes32 _claimId) public override view returns(uint256 claimType, uint256 scheme, address issuer, bytes memory signature, bytes memory data, string memory uri) {
    return (
    claims[_claimId].claimType,
    claims[_claimId].scheme,
    claims[_claimId].issuer,
    claims[_claimId].signature,
    claims[_claimId].data,
    claims[_claimId].uri
    );
  }

  function getClaimIdsByType(uint256 _claimType) public override view returns(bytes32[] memory claimIds) {
    return claimsByType[_claimType];
  }

  function addClaim(uint256 _claimType, uint256 _scheme, address _issuer, bytes memory _signature, bytes memory _data, string memory _uri) public override returns(bytes32 claimRequestId) {
    bytes32 claimId = keccak256(abi.encodePacked(_issuer, _claimType));

    if (msg.sender != address(this)) {
      require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 3), "Sender does not have claim signer key");
    }

    if (claims[claimId].issuer != _issuer) {
      claimsByType[_claimType].push(claimId);
    }

    claims[claimId].claimType = _claimType;
    claims[claimId].scheme = _scheme;
    claims[claimId].issuer = _issuer;
    claims[claimId].signature = _signature;
    claims[claimId].data = _data;
    claims[claimId].uri = _uri;

    emit ClaimAdded(
      claimId,
      _claimType,
      _scheme,
      _issuer,
      _signature,
      _data,
      _uri
    );

    return claimId;
  }

  function removeClaim(bytes32 _claimId) public override returns(bool success) {
    if (msg.sender != address(this)) {
      require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 1), "Sender does not have management key");
    }

    /* uint index; */
    /* (index, ) = claimsByType[claims[_claimId].claimType].indexOf(_claimId);
    claimsByType[claims[_claimId].claimType].removeByIndex(index); */

    emit ClaimRemoved(
      _claimId,
      claims[_claimId].claimType,
      claims[_claimId].scheme,
      claims[_claimId].issuer,
      claims[_claimId].signature,
      claims[_claimId].data,
      claims[_claimId].uri
    );

    delete claims[_claimId];
    return true;
  }
}
