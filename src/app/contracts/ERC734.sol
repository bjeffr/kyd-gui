pragma solidity 0.6.1;

abstract contract ERC734 {

    uint256 constant MANAGEMENT_KEY = 1;
    uint256 constant EXECUTION_KEY = 2;
    uint256 constant CLAIM_SIGNER_KEY = 3;
    uint256 constant ENCRYPTION_KEY = 4;

    event KeyAdded(bytes32 indexed key, uint256 indexed purpose, uint256 indexed keyType);
    event KeyRemoved(bytes32 indexed key, uint256 indexed purpose, uint256 indexed keyType);
    event ExecutionRequested(uint256 indexed executionId, address indexed to, uint256 indexed value, bytes data);
    event Executed(uint256 indexed executionId, address indexed to, uint256 indexed value, bytes data);
    event Approved(uint256 indexed executionId, bool approved);
    event KeysRequiredChanged(uint256 purpose, uint256 number);

    struct Key {
        uint256 purpose; // e.g. MANAGEMENT = 1, CLAIM = 3
        uint256 keyType; // e.g. ECDSA = 1, RSA = 2
        bytes32 key;
    }

    function getKey(bytes32 _key) public virtual view returns(uint256 purpose, uint256 keyType, bytes32 key);
    function keyHasPurpose(bytes32 _key, uint256 _purpose) public virtual view returns(bool exists);
    function getKeysByPurpose(uint256 _purpose) public virtual view returns(bytes32[] memory keys);
    function addKey(bytes32 _key, uint256 _purpose, uint256 _keyType) public virtual returns(bool success);
    function removeKey(bytes32 _key) public virtual returns(bool success);
    function execute(address _to, uint256 _value, bytes memory _data) public virtual returns(uint256 executionId);
    function approve(uint256 _id, bool _approve) public virtual returns(bool success);
}
