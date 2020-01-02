#include <emscripten.h>
#include <openssl/md5.h>
#include <string.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
void md5(char *str, char *result) {
  MD5_CTX md5_ctx;
  int MD5_BYTES = 16;
  unsigned char md5sum[MD5_BYTES];
  MD5_Init(&md5_ctx);
  MD5_Update(&md5_ctx, str, strlen(str));
  MD5_Final(md5sum, &md5_ctx);
  char temp[3] = {0};
  memset(result, sizeof(char) * 32, 0);
  for (int i = 0; i < MD5_BYTES; i++) {
    sprintf(temp, "%02x", md5sum[i]);
    strcat(result, temp);
  }
  result[32] = '\0';
}