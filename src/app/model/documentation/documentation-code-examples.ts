export class DocumentationCodeExamples {
    public readonly ex1: string = `double**A, **B, **C;
...
#pragma ops distribute data(A, N, N, 1, d, d)
#pragma ops distribute data(B, N, N, 1, d, d)
#pragma ops distribute data(C, N, N, 1, d, d)

for (bi = 0; bi < blockCount; bi++)
for (bj = 0; bj < blockCount; bj++)
for (bk = 0; bk < blockCount; bk++)
        for (i = 0; i < d; i++)
    for (j = 0; j < d; j++)
    for (k =0; k <d; k++)
        C[bi*d+i][bj*d+j] += A[bi*d+i][bk*d+k]*B[bk*d+k][bj*d+j];`;
}
