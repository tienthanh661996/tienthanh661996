import java.util.Scanner;

class  ConvertUSDtoVND {

    public static void main(String[] args) {
        // Khai báo biến tỉ giá
        int rate = 23000;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Nhập giá trị USD: ");
        int usd = scanner.nextInt();
        int vnd=rate*usd ;
        System.out.println("Giá trị VND tương đương: " + vnd);
    }
}
