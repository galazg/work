#include <stdio.h>

struct node {
 int value;
 struct node *left, *right;
}*root=NULL;

struct node* newnode(int value, struct node *left, struct node *right){
    struct node* mynode = (struct node*)malloc(sizeof(struct node));
    mynode->value = value;
    mynode->left = left;
    mynode->right = right;
    return(mynode);
}

void printout (struct node *tree){
    printf("Value %d ", tree->value);
    if(tree->left)
        printf("L %d ", tree->left->value);
    if(tree->right)
        printf("R %d ", tree->right->value);
    printf("\n");
    if ((tree->left->left)||(tree->left->right))
        printout(tree->left);
    if ((tree->right->left)||(tree->right->right))
        printout(tree->right);
}

int depth (struct node *tree){
    if(tree==NULL) return(0);
    int ldepth = depth(tree->left);
    int rdepth = depth(tree->right);
    if(ldepth > rdepth)
        return (ldepth+1);
    else
        return (rdepth+1);
}

int main()
{
    root = newnode(1,newnode(2,newnode(3,NULL,NULL),newnode(4,NULL,NULL)),newnode(5,NULL,NULL));

    printf("Tree elements are\n");
    printout(root);
    printf("Depth is %d\n",depth(root));
    return (0);
}
