import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // Khai báo biến scanner
        Scanner scanner = new Scanner(System.in);

        // Khai báo biến điểm
        int toan, ly, hoa, van, anh;

        // Nhập điểm của học sinh
        System.out.println("Nhập điểm Toán: ");
        toan = scanner.nextInt();

        System.out.println("Nhập điểm Lý: ");
        ly = scanner.nextInt();

        System.out.println("Nhập điểm Hóa: ");
        hoa = scanner.nextInt();

        System.out.println("Nhập điểm Văn: ");
        van = scanner.nextInt();

        System.out.println("Nhập điểm Tiếng Anh: ");
        anh = scanner.nextInt();

        // Tính điểm trung bình
        int diemTB = (toan + ly + hoa + van + anh) / 5;

        // Xếp loại học lực
        String hocluc;
        if (diemTB < 5) {
            hocluc = "Yếu";
        } else if (diemTB < 6.5) {
            hocluc = "Trung bình";
        } else if (diemTB < 8) {
            hocluc = "Khá";
        } else if (diemTB < 9) {
            hocluc = "Giỏi";
        } else {
            hocluc = "Xuất sắc";
        }

        // Hiển thị kết quả
        System.out.println("Điểm trung bình: " + diemTB);
        System.out.println("Học lực: " + hocluc);
    }
}
