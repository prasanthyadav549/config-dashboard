import forge from 'node-forge';
import jose from 'node-jose';

const PRIVATE_KEY = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIE6TAbBgkqhkiG9w0BBQMwDgQIcfM72Sc1g8ECAggABIIEyKTJn6taULz3pDOG
4YruCC8zjP5ggOTKatoxqR79l5MvjFDBj5z7Xb8P/atIjqHQ2cuiegyatRYqAdVM
2QeAO0UvJPCFZ2NFVpiIa1HfBt1ySoSxNwWrtbskDtKhA5rhOQY3eyx4RrKfMpia
8sHGLCrY4tnmXddyuKdMAvoAl94kWeQ+lbhOILDr56mR6TGjHhNJYCNt3vXm0kp7
j6TbBIZZtyVziUHVcM1aekqUB9jGGuZOkeePZrJNKF7vNp/Er9YWggZsaNE36NVN
vrgSIdPVbxeAsBxNUavu2xk35mNohh9rnC9+SJlJgPVM/Qu0LrmOTwi33vkf25eU
ss/mb782umy6eDoDwSTRfpJnZPqeQb1552fHA7xvn+MxZaE611akr3j+psI4GFWc
KPfd7r15/KHNvoqkDAAd5d5KWIifHd9xFRIndiKezscrjEWLCal2q2vChE0GJ+PV
I8+lWQfYQ7iAps8pr930bMz/1t6pS5ZdNJsXo4qyCNit7B1INOmLSWCz3j0HEFmH
FNag3A/v8X8oTq6COm4k4niwks3pTzKOh7JGsE66iDB3nczTsedbbbdrEFw5AhNy
QBl1gVM+iG9uzSnARbpbdkQ8yPhN7qW7NPvH9T+ze2tiw/QYljbQwHyi9F6JqRay
QGBVRcwVOyN32gc44DCX2V+YCYLjsvLwf9vpbgWANxuNHJQSE7m0IskaQbCWHrkE
zdEb3Zv+n37JQ6QDq27WZudpzPNVkA/ylPI5z7P8K3zwHUF/eZ3vUXaEvR5WyEVL
YAMTF9ClFgKYr/r+NHYqdZ7knhTH4xWTQqQRKNEsiJHSSxA4rqDGLJk5b/RKVdYt
dkumr0hu+HrCPay7GGOaJWt5dO/xFJDDAzF7xSnPP33UM7DFiznX4cICJ5dSuMp7
raXaTeL8wJf4iQRwcLJRb/Wi2gzdWIQmtEOvzjpn9eGXW42IfNhnWlHoA4gsXl5U
7jVfqK/bNwP6q/F1ARgWEXvjt2o9/qCDEe9fOIkXNYBI4HOwxDCHzNklr7e4E0Dv
tMNeGKnWPeJWFQkVQpaWXiWMfm9x4FeTv74CQOAmcfKjPXI5MWvBGRIDmm9yRMsa
HCSNExeZxVQACzsq0BHz/5FLzhn5rw/3CpRfZMrAUYgMwtfoDs5X8WA3OgyMukgb
jNjZq8o4HC7BEnTg1s5DvP3Efgve1VVAKaeNo2SEWd8MY/fE4GLvI/XTgLFZT07h
FllFpvru2sGDBTKZVeNNOMOM46R0lLbsRnmbFVrIg2HSj89ptzB5MYvXI9vq9cvM
ewOudSOKltgWNlj+EqATWM43PBneL2X1bExHza1xEGyRbUSUbVCMK2t+ApEJC80f
7JG3CFw7cfzJ70wmGHmf0tTJdmy/KSKCsI+vTHQnQyUp79YDb8JPbwcFsZmOP2LR
ZX4zGQBcXsKqUuOba53C1X/mo3WMnA33DcQ/EzcIQBHLue/h9LKbayKkwI1pqIoH
SFE4P6j6e5Q3kMAoAL8nPks7js9O1PaZDXs3hn/7kK46xoZvNHLh/km+LLltLas7
mZQ1LL9vgZ3ghjOaUAqQCocpjzcWbtCrERlsxUCOnshfDhV4FluglWcXratP/4Pv
QN12sCba/DlWnp6gQg==
-----END ENCRYPTED PRIVATE KEY-----`

const SNOWFLAKE_ACCOUNT = 'aapnonprod';
const PUBLIC_KEY_FINGERPRINT = 'SHA256:jQN20lGBWFvK7ecBZkgv140dTl+fGxUMD1fd1znBAf4=';

const getBearerToken = async () => {

    const removeB64Padding = base64 => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    function encodeB64(str) {
        const encodedB64 = forge.util.encode64(str)
        return removeB64Padding(encodeB64)
    }

    try {
        const keystore = jose.JWK.createKeyStore();
        const decryptedKey = await keystore.add(PRIVATE_KEY, 'pem', { passphrase: 'VSe1ymt$d9S' });
        console.log('decrypted key', decryptedKey);
    
        const privateKey = forge.pki.privateKeyFromPem(decryptedKey.toPEM(true));
        const md = forge.md.sha256.create();
        const header = {
          typ: 'JWT',
          alg: 'RS256'
        };
    
        const qualified_username = `${SNOWFLAKE_ACCOUNT}.AAP_PRODUCT_PIM_DEV_USER`;
        const payload = {
          iss: `${qualified_username}.${PUBLIC_KEY_FINGERPRINT}`,
          sub: qualified_username,
          iat: Math.round(new Date().getTime() / 1000),
          exp: Math.round(new Date().getTime() / 1000) + 3600
        };
    
        const strHeader = JSON.stringify(header);
        const strPayload = JSON.stringify(payload);
        const headerB64 = encodeB64(strHeader);
        const payloadB64 = encodeB64(strPayload);
        const preHash = `${headerB64}.${payloadB64}`;
    
        md.update(preHash, 'utf8');
        const signature = privateKey.sign(md);
        const signature64 = encodeB64(signature);
    
        return `${headerB64}.${payloadB64}.${signature64}`;
      } catch (error) {
        console.error('Error decrypting the private key:', error);
        throw error;
      }
    };
    
    export default getBearerToken;