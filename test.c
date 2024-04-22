#include <stdio.h>
#include <string.h>
int main(void){
    char str[50];
    char c;
    /*fgets(str,sizeof(str),stdin);
    str[strlen(str)-1] = '\0';*/
    scanf("%s",str);
    getchar();
    scanf("%c", &c);
    printf("%s\n",str);
    return 0;
}