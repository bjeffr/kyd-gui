pragma solidity 0.6.1;

abstract contract ERC735 {

    event ClaimRequested(uint256 indexed claimRequestId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);    event ClaimAdded(bytes32 indexed claimId, uint256 indexed claimType, address indexed issuer, uint256 signatureType, bytes32 signature, bytes claim, string uri);
    event ClaimAdded(bytes32 indexed claimId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimRemoved(bytes32 indexed claimId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);
    event ClaimChanged(bytes32 indexed claimId, uint256 indexed claimType, uint256 scheme, address indexed issuer, bytes signature, bytes data, string uri);

    struct Claim {
        uint256 claimType; // e.g. KYC = 7, KYD = 8
        uint256 scheme; // e.g. ECDSA = 1, RSA = 2
        address issuer;
        bytes signature; // this.address + topic + data
        bytes data;
        string uri;
    }

    function getClaim(bytes32 _claimId) public virtual view returns(uint256 claimType, uint256 scheme, address issuer, bytes memory signature, bytes memory data, string memory uri);
    function getClaimIdsByType(uint256 _claimType) public virtual view returns(bytes32[] memory claimIds);
    function addClaim(uint256 _claimType, uint256 _scheme, address _issuer, bytes memory _signature, bytes memory _data, string memory _uri) public virtual returns(bytes32 claimRequestId);
    function removeClaim(bytes32 _claimId) public virtual returns(bool success);
}
